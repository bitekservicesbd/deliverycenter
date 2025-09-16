<?php

namespace App\Http\Controllers\TenantControllers;

use App\Http\Controllers\Controller;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function index()
    {
        $google2fa = app('pragmarx.google2fa');

        $user = Auth::user();

        $secret = $google2fa->generateSecretKey();

        $qrUrl = $google2fa->getQRCodeUrl(
            config('app.name'),
            $user->email,
            $secret
        );

        $writer = new Writer(
            new ImageRenderer(
                new RendererStyle(200),
                new SvgImageBackEnd
            )
        );

        $qrCodeSvg = base64_encode($writer->writeString($qrUrl));

        session(['2fa_secret' => $secret]);

        return Inertia::render('tenants/2fa/index', [
            'qrCodeSvg' => $qrCodeSvg,
            'secret' => $secret,
        ]);
    }

    public function enable(Request $request)
    {
        $request->validate([
            'otp' => 'required|digits:6',
        ]);

        $user = Auth::user();
        $secret = session('2fa_secret');
        $google2fa = app('pragmarx.google2fa');

        if ($google2fa->verifyKey($secret, $request->otp)) {
            $user->google2fa_secret = $secret;
            $user->save();

            return redirect()->back()->with('success', '2FA enabled!');
        }

        return back()->with('error', 'Invalid OTP, please try again.');
    }

    public function disable(Request $request)
    {
        $request->validate([
            'otp' => 'required|digits:6',
        ]);

        $user = Auth::user();

        if (! $user->google2fa_secret) {
            return redirect()->route('central.settings.verify-2fa')->with('info', '2FA is not enabled.');
        }

        $google2fa = app('pragmarx.google2fa');

        $otpValid = $google2fa->verifyKey($user->google2fa_secret, $request->input('otp'));

        if (! $otpValid) {
            return back()->with('error', 'Invalid OTP. Please try again.');
        }

        $user->google2fa_secret = null;
        $user->save();

        session()->forget('google2fa_passed');

        return redirect()->back()->with('success', '2FA disabled!');
    }

    public function verify()
    {
        return Inertia::render('tenants/2fa/verify');
    }
}
