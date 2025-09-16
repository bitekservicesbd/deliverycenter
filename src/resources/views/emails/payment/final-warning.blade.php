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
            .highlight {
                background: #f8f8f8;
                padding: 15px;
                border-left: 4px solid #f0f0f0;
                margin: 20px 0;
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
                        <h2 style="color: #673de6; margin-top: 0; font-weight: 600">{{ __('Final Warning') }}</h2>
                        <p>{{ __('This is your final warning. Your account  will be suspended soon due to non-payment.') }}</p>
                        <div class="highlight">
                            <strong>Service suspension in:</strong>
                            24 hours
                            <br />
                            <strong>Amount:</strong>
                            ${{ number_format($tenant->plan->monthly_price ?? $tenant->plan->yearly_price) }}
                            <br />
                            <strong>Plan:</strong>
                            {{ $tenant->plan->name ?? 'N/A' }}
                        </div>

                        <div style="text-align: center">
                            <a href="{{ $paymentLink }}" class="button">{{ __('Pay Now') }}</a>
                        </div>

                        <p class="small-text">
                            {{ __('Thank you for choosing our service!') }}
                        </p>
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
                            {{ __('This is an automated message. Please do not reply to this email.') }}
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
