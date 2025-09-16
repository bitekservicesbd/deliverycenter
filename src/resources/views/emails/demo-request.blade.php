<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Demo Request</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 8px; overflow: hidden">
                        {{-- Header Logo --}}
                        <tr style="background-color: #fff">
                            <td style="padding: 20px; text-align: left">
                                <img src="https://i.ibb.co/p6K8GWL5/logo.png" alt="Logo" style="height: 40px" />
                            </td>
                        </tr>

                        {{-- Content --}}
                        <tr>
                            <td style="padding: 30px">
                                <h2 style="color: #673de6">New Demo Request</h2>
                                <p>You received a new demo request with the following details:</p>

                                <table style="width: 100%; margin-top: 20px">
                                    <tr>
                                        <td><strong>Full Name:</strong></td>
                                        <td>{{ $data['name'] }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Company:</strong></td>
                                        <td>{{ $data['company_name'] ?? 'N/A' }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email:</strong></td>
                                        <td>{{ $data['email'] }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Phone:</strong></td>
                                        <td>{{ $data['phone'] }}</td>
                                    </tr>
                                </table>

                                <div style="margin-top: 30px; text-align: left">
                                    <a
                                        href="mailto:{{ $data['email'] }}"
                                        style="background-color: #673de6; padding: 10px 20px; color: white; text-decoration: none; border-radius: 5px"
                                    >
                                        Reply Now
                                    </a>
                                </div>

                                <p style="margin-top: 40px; font-size: 12px; color: #999">
                                    This email was generated automatically. Please do not reply directly.
                                </p>
                            </td>
                        </tr>

                        {{-- Footer Logo --}}
                        <tr style="background-color: #fff">
                            <td style="padding: 20px; text-align: left">
                                <img src="https://i.ibb.co/p6K8GWL5/logo.png" alt="Logo" style="height: 40px" />
                            </td>
                        </tr>

                        {{-- Footer Info --}}
                        <tr style="background-color: #f2f2f2">
                            <td style="padding: 20px; text-align: center; font-size: 12px; color: #555">
                                <p style="margin: 0 0 8px">
                                    You received this email because you requested a demo or interacted with DeliveryCenter. This helps us ensure
                                    communication regarding our services and policies.
                                </p>
                                <a href="https://yourdomain.com/privacy-policy" style="font-size: 12px; color: #673de6; text-decoration: underline">
                                    Privacy Policy
                                </a>
                                <p style="margin-top: 8px">
                                    &copy; {{ now()->year }}
                                    <strong style="color: #673de6">DeliveryCenter</strong>
                                    International Ltd.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
