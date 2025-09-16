<?php

namespace App\Http\Controllers\CentralControllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CentralAppSettingsRequest;
use App\Models\CentralAppSetting;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AppSettingController extends Controller
{
    public function general()
    {
        $setting = CentralAppSetting::first();

        if ($setting) {
            if ($setting->app_logo && ! str_starts_with($setting->app_logo, 'http')) {
                $setting->app_logo = Storage::url($setting->app_logo);
            }
            if ($setting->dark_logo && ! str_starts_with($setting->dark_logo, 'http')) {
                $setting->dark_logo = Storage::url($setting->dark_logo);
            }
            if ($setting->favicon && ! str_starts_with($setting->favicon, 'http')) {
                $setting->favicon = Storage::url($setting->favicon);
            }
        }

        return Inertia::render('centrals/settings/generalSettings', [
            'setting' => $setting,
            'routes' => [
                'update' => route('central.settings.general.update'),
            ],
        ]);
    }

    public function generalUpdate(CentralAppSettingsRequest $request)
    {

        try {
            $data = $request->validated();
            $updateData = $request->only([
                'app_name',
                'author_name',
                'app_email',
                'app_phone',
                'footer_copyright_text',
            ]);

            $setting = CentralAppSetting::first();

            $uploadables = [
                'app_logo' => 'settings/logos',
                'dark_logo' => 'settings/logos',
                'favicon' => 'settings/favicons',
            ];

            foreach ($uploadables as $key => $folder) {
                if ($request->hasFile($key)) {
                    $uploadedPath = $request->file($key)->store($folder, 's3');
                    $updateData[$key] = $uploadedPath;

                    if ($setting && $setting->{$key}) {
                        Storage::disk('s3')->delete($setting->{$key});
                    }
                }
            }

            if ($setting) {
                $setting->update($updateData);
            } else {
                CentralAppSetting::create($updateData);
            }

            return redirect()->back()->with('success', __('Settings updated successfully'));
        } catch (\Exception $e) {
            Log::error('Central App Settings error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong: '.$e->getMessage()));
        }
    }

    public function mail()
    {
        $setting = CentralAppSetting::first();

        return Inertia::render('centrals/settings/mailSettings', [
            'setting' => $setting,
            'routes' => [
                'update' => route('central.settings.mail.update'),
            ],
        ]);
    }

    public function mailUpdate(CentralAppSettingsRequest $request)
    {
        try {
            $data = $request->validated();

            $setting = CentralAppSetting::first();
            if ($setting) {
                $setting->update($data);
            } else {
                CentralAppSetting::create($data);
            }

            updateEnv([
                'MAIL_MAILER' => $data['mail_driver'],
                'MAIL_HOST' => $data['host'],
                'MAIL_PORT' => $data['port'],
                'MAIL_USERNAME' => $data['username'],
                'MAIL_PASSWORD' => $data['password'],
                'MAIL_ENCRYPTION' => $data['encryption'],
                'MAIL_FROM_ADDRESS' => $data['mail_from_address'],
                'MAIL_FROM_NAME' => $data['mail_from_name'],
            ]);

            Artisan::call('config:clear');
            Artisan::call('cache:clear');

            return redirect()->back()->with('success', __('Mail Settings updated successfully'));
        } catch (\Exception $e) {
            Log::error('Mail Settings error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong: '.$e->getMessage()));
        }
    }

    public function recaptcha()
    {
        $setting = CentralAppSetting::first();

        return Inertia::render('centrals/settings/recaptchaSettings', [
            'setting' => $setting,
            'routes' => [
                'update' => route('central.settings.recaptcha.update'),
            ],
        ]);
    }

    public function recaptchaUpdate(CentralAppSettingsRequest $request)
    {
        try {
            $data = $request->validated();

            $setting = CentralAppSetting::first();

            if ($setting) {
                $setting->update($data);
            } else {
                CentralAppSetting::create($data);
            }

            return redirect()->back()->with('success', __('Recaptcha Settings updated successfully'));
        } catch (\Exception $e) {
            Log::error('Recaptcha Settings error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong: '.$e->getMessage()));
        }
    }

    public function aws()
    {
        $setting = [
            'aws_access_key_id' => env('AWS_ACCESS_KEY_ID'),
            'aws_secret_access_key' => env('AWS_SECRET_ACCESS_KEY'),
            'aws_default_region' => env('AWS_DEFAULT_REGION'),
            'aws_bucket' => env('AWS_BUCKET'),
            'aws_url' => env('AWS_URL'),
        ];

        return Inertia::render('centrals/settings/aws', [
            'setting' => $setting,
            'routes' => [
                'update' => route('central.settings.aws.update'),
            ],
        ]);
    }

    public function awsUpdate(CentralAppSettingsRequest $request)
    {
        try {
            $data = [
                'AWS_ACCESS_KEY_ID' => $request->aws_access_key_id,
                'AWS_SECRET_ACCESS_KEY' => $request->aws_secret_access_key,
                'AWS_DEFAULT_REGION' => $request->aws_default_region,
                'AWS_BUCKET' => $request->aws_bucket,
                'AWS_URL' => $request->aws_url,
            ];
            updateEnv($data);

            return redirect()->back()->with('success', __('AWS Settings updated successfully'));
        } catch (\Exception $e) {
            Log::error('AWS Settings error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong: '.$e->getMessage()));
        }
    }

    public function paymentSettings()
    {
        $setting = CentralAppSetting::first();

        return Inertia::render('centrals/settings/paymentSettings', [
            'settings' => $setting,
            'routes' => [
                'update' => route('central.settings.payment.update'),
            ],
        ]);
    }

    public function paymentSettingsUpdate(CentralAppSettingsRequest $request)
    {
        try {
            $data = $request->validated();
            $setting = CentralAppSetting::first();

            if ($setting) {
                $setting->update($data);
            } else {
                CentralAppSetting::create($data);
            }

            return redirect()->back()->with('success', __('Payment Settings updated successfully'));
        } catch (\Exception $e) {
            Log::error('Payment Settings error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong: '.$e->getMessage()));
        }
    }
}
