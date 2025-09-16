import { useEffect, useState } from 'react';

interface CountdownProps {
    endsAt: string;
}

export default function Countdown({ endsAt }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const end = new Date(endsAt);
            const diff = end.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft('Trial expired');
                clearInterval(interval);
                return;
            }

            const totalHours = diff / (1000 * 60 * 60);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            if (totalHours > 24) {
                setTimeLeft(`${days} days left`);
            } else {
                setTimeLeft(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} left`,
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endsAt]);

    return <span>{timeLeft}</span>;
}
