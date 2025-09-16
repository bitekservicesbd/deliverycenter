<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Reset Your Password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style type="text/css">
            body {
                font-family: 'Poppins', Arial, sans-serif;
                background-color: #f7f7f7;
                padding: 20px;
                margin: 0;
            }

            @media screen and (max-width: 480px) {
                body {
                    font-family: Arial, sans-serif !important;
                }
            }
            .email-container {
                max-width: 600px;
                width: 100%;
                margin: 0 auto;
            }
            .email-content {
                width: 100%;
                background: white;
                border-radius: 8px;
                overflow: hidden;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            .logo {
                width: 180px;
            }

            .content-padding {
                padding: 25px 20px !important;
            }

            .header {
                background-color: #fff;
                padding: 20px;
                text-align: left;
            }
            .button {
                background-color: #673de6;
                padding: 12px 24px;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-weight: 600;
                display: inline-block;
                margin: 20px 0;
                font-family: 'Poppins', Arial, sans-serif;
            }
            .footer {
                background-color: #f2f2f2;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #555;
            }

            .small-text {
                font-size: 12px;
                color: #999;
                margin-top: 30px;
            }
            @media screen and (max-width: 480px) {
                .content-padding {
                    padding: 20px 15px !important;
                }

                h2 {
                    font-size: 20px !important;
                }

                .button {
                    padding: 10px 20px !important;
                }

                .header,
                .footer {
                    padding: 15px !important;
                }

                .logo {
                    width: 130px !important;
                }
            }
        </style>
    </head>
    <body style="font-family: 'Poppins', Arial, sans-serif">
        <div class="email-container">
            <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                <!-- Header Logo -->
                <tr>
                    <td class="header">
                        <img src="{{ asset('assets/images/logo.png') }}" alt="logo" class="logo" />
                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td class="content-padding">
                        <h2 style="color: #673de6; margin-top: 0; font-weight: 600">Set Your Password</h2>
                        <p style="margin-bottom: 20px">
                            You recently requested to reset your password for your account. Use the button below to reset it.
                        </p>

                        <div style="text-align: center">
                            <a href="{{ $resetUrl }}" class="button">Set Password</a>
                        </div>

                        <p style="margin-bottom: 0">If you didn't request a password reset, you can safely ignore this email.</p>

                        <p class="small-text">This email was generated automatically. Please do not reply directly.</p>
                    </td>
                </tr>

                <!-- Footer Logo -->
                <tr>
                    <td class="header">
                        <img src="{{ asset('assets/images/logo.png') }}" alt="logo" class="logo" />
                    </td>
                </tr>

                <!-- Footer Info -->
                <tr>
                    <td class="footer">
                        <p style="margin: 0 0 8px">
                            You received this email because a password reset request was made for your account at DeliveryCenter.
                        </p>
                        <p style="margin: 8px 0 0">
                            &copy; {{ now()->year }}
                            <strong style="color: #673de6">
                                <a href="https://bitekservices.com/" style="color: #673de6; text-decoration: none">Bitek Services</a>
                            </strong>
                            Inc.
                        </p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
</html>
