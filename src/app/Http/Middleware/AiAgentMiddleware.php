<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;

class AiAgentMiddleware
{
    /**
     * Security models configuration
     */
    private array $securityModels = [
        'sentiment' => [
            'url' => 'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest',
            'threshold' => 0.8,
            'enabled' => true,
        ],
        'toxicity' => [
            'url' => 'https://api-inference.huggingface.co/models/martin-ha/toxic-comment-model',
            'threshold' => 0.7,
            'enabled' => true,
        ],
        'hate_speech' => [
            'url' => 'https://api-inference.huggingface.co/models/unitary/toxic-bert',
            'threshold' => 0.6,
            'enabled' => true,
        ],
    ];

    /**
     * Suspicious patterns to check
     */
    private array $suspiciousPatterns = [
        '/\b(hack|exploit|breach|inject|malware|virus)\b/i',
        '/\b(spam|phishing|scam|fraud)\b/i',
        '/\b(bypass|circumvent|override)\b/i',
        '/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i',
        '/union\s+select|drop\s+table|insert\s+into/i',
    ];

    /**
     * Handle an incoming request
     */
    public function handle(Request $request, Closure $next): mixed
    {
        try {
            if ($this->isRateLimited($request)) {
                return $this->blockRequest('Rate limit exceeded', 429);
            }

            $content = $this->extractContent($request);

            if (empty($content)) {
                return $next($request);
            }

            $cacheKey = 'security_check_'.md5($content);
            if (Cache::has($cacheKey)) {
                $cachedResult = Cache::get($cacheKey);
                if (! $cachedResult['safe']) {
                    return $this->blockRequest($cachedResult['reason'], 403);
                }

                return $next($request);
            }

            $securityResult = $this->performSecurityChecks($content);

            Cache::put($cacheKey, $securityResult, 3600);

            if (! $securityResult['safe']) {
                $this->logSecurityEvent($request, $securityResult);

                return $this->blockRequest($securityResult['reason'], 403);
            }

            $response = $next($request);

            return $this->addSecurityHeaders($response);

        } catch (\Exception $e) {
            Log::error('ContentSecurityGuard Error: '.$e->getMessage(), [
                'request_id' => $request->header('X-Request-ID'),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return $next($request);
        }
    }

    /**
     * Check if request is rate limited
     */
    private function isRateLimited(Request $request): bool
    {
        $key = 'security_check:'.$request->ip();

        return RateLimiter::tooManyAttempts($key, 100);
    }

    /**
     * Extract content from request for analysis
     */
    private function extractContent(Request $request): string
    {
        $content = [];

        $requestData = $request->all();

        foreach ($requestData as $key => $value) {
            if (is_string($value) && strlen($value) > 3) {
                $content[] = $value;
            } elseif (is_array($value)) {
                $content[] = json_encode($value);
            }
        }

        $suspiciousHeaders = ['user-agent', 'referer', 'x-forwarded-for'];
        foreach ($suspiciousHeaders as $header) {
            if ($request->hasHeader($header)) {
                $content[] = $request->header($header);
            }
        }

        return implode(' ', $content);
    }

    /**
     * Perform comprehensive security checks
     */
    private function performSecurityChecks(string $content): array
    {
        $results = [
            'safe' => true,
            'reason' => '',
            'risk_score' => 0,
            'triggered_rules' => [],
        ];

        $patternResult = $this->checkSuspiciousPatterns($content);
        if (! $patternResult['safe']) {
            return $patternResult;
        }

        if (strlen($content) > 10000) {
            return [
                'safe' => false,
                'reason' => 'Content exceeds maximum length limit',
                'risk_score' => 0.9,
                'triggered_rules' => ['length_limit'],
            ];
        }

        $aiResult = $this->performAiSecurityAnalysis($content);
        if (! $aiResult['safe']) {
            return $aiResult;
        }

        return $results;
    }

    /**
     * Check for suspicious patterns
     */
    private function checkSuspiciousPatterns(string $content): array
    {
        foreach ($this->suspiciousPatterns as $pattern) {
            if (preg_match($pattern, $content)) {
                return [
                    'safe' => false,
                    'reason' => 'Suspicious pattern detected in request content',
                    'risk_score' => 0.95,
                    'triggered_rules' => ['pattern_match'],
                ];
            }
        }

        return ['safe' => true];
    }

    /**
     * Perform AI-based security analysis
     */
    private function performAiSecurityAnalysis(string $content): array
    {
        $overallRiskScore = 0;
        $triggeredModels = [];

        foreach ($this->securityModels as $modelName => $config) {
            if (! $config['enabled']) {
                continue;
            }

            try {
                $response = Http::timeout(5)
                    ->withHeaders([
                        'Authorization' => 'Bearer '.env('HF_API_KEY'),
                        'Content-Type' => 'application/json',
                    ])
                    ->post($config['url'], [
                        'inputs' => $content,
                        'parameters' => [
                            'wait_for_model' => true,
                        ],
                    ]);

                if ($response->successful()) {
                    $result = $response->json();
                    $riskScore = $this->parseModelResult($result, $modelName);

                    if ($riskScore >= $config['threshold']) {
                        $triggeredModels[] = $modelName;
                        $overallRiskScore = max($overallRiskScore, $riskScore);
                    }
                }

            } catch (\Exception $e) {
                Log::warning("Security model {$modelName} failed: ".$e->getMessage());

                continue;
            }
        }

        if ($overallRiskScore >= 0.7) {
            return [
                'safe' => false,
                'reason' => 'Content failed security analysis',
                'risk_score' => $overallRiskScore,
                'triggered_rules' => $triggeredModels,
            ];
        }

        return ['safe' => true];
    }

    /**
     * Parse model results based on model type
     */
    private function parseModelResult(array $result, string $modelName): float
    {
        if (empty($result)) {
            return 0;
        }

        switch ($modelName) {
            case 'sentiment':
                foreach ($result as $prediction) {
                    if (isset($prediction['label']) &&
                        in_array(strtoupper($prediction['label']), ['NEGATIVE', 'NEG']) &&
                        isset($prediction['score'])) {
                        return $prediction['score'];
                    }
                }
                break;

            case 'toxicity':
            case 'hate_speech':
                foreach ($result as $prediction) {
                    if (isset($prediction['label']) &&
                        in_array(strtoupper($prediction['label']), ['TOXIC', 'HATE', '1']) &&
                        isset($prediction['score'])) {
                        return $prediction['score'];
                    }
                }
                break;
        }

        return 0;
    }

    /**
     * Block request with appropriate response
     */
    private function blockRequest(string $reason, int $statusCode = 403): JsonResponse
    {
        return response()->json([
            'success' => false,
            'error' => 'Request blocked by security system',
            'message' => 'Your request has been flagged by our content security system.',
            'reference_id' => uniqid('CSG_'),
            'timestamp' => now()->toISOString(),
        ], $statusCode);
    }

    /**
     * Log security events
     */
    private function logSecurityEvent(Request $request, array $securityResult): void
    {
        Log::warning('ContentSecurityGuard: Request blocked', [
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'reason' => $securityResult['reason'],
            'risk_score' => $securityResult['risk_score'],
            'triggered_rules' => $securityResult['triggered_rules'],
            'timestamp' => now()->toISOString(),
        ]);
    }

    /**
     * Add security headers to response
     */
    private function addSecurityHeaders($response)
    {
        if (method_exists($response, 'header')) {
            $response->header('X-Content-Security-Status', 'verified');
            $response->header('X-Security-Middleware', 'ContentSecurityGuard');
        }

        return $response;
    }
}
