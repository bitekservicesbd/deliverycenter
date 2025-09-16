<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>{{ $title ?? 'Error' }}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <!-- Google Fonts: Poppins -->
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <style>
            :root {
                --red: #dc2626;
                --gray: #374151;
                --blue: #2563eb;
                --blue-dark: #1d4ed8;
                --white: #ffffff;
                --background: #f9fafb;
                --shadow: rgba(0, 0, 0, 0.06);
            }

            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            body {
                font-family: 'Poppins', sans-serif;
                background-color: var(--background);
                color: var(--gray);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }

            .error-container {
                width: 100%;
                max-width: 480px;
                background-color: var(--white);
                border: 1px solid #e5e7eb;
                border-radius: 16px;
                padding: 2rem;
                box-shadow: 0 6px 18px var(--shadow);
                text-align: center;
            }

            .error-title {
                font-size: 1.75rem;
                font-weight: 700;
                color: var(--red);
            }

            .error-message {
                margin-top: 1rem;
                font-size: 1rem;
                line-height: 1.6;
            }

            .back-link {
                display: inline-block;
                margin-top: 2rem;
                padding: 0.5rem 1rem;
                font-size: 1rem;
                background-color: var(--blue);
                color: var(--white);
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }

            .back-link:hover {
                background-color: var(--blue-dark);
            }

            @media (max-width: 480px) {
                .error-title {
                    font-size: 1.5rem;
                }

                .error-message {
                    font-size: 0.95rem;
                }

                .back-link {
                    font-size: 0.95rem;
                    padding: 0.6rem 1.2rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <div class="error-title">{{ $title ?? 'Error' }}</div>
            <div class="error-message">{{ $message ?? 'Something went wrong.' }}</div>
            <a href="{{ route('contact') }}" class="back-link">Contact →</a>
        </div>
    </body>
</html>
