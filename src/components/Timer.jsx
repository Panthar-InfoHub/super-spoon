'use client'
import { useState, useEffect } from 'react'

const GLOBAL_END_TIME = "2024-12-22T00:00:00Z"
const TimerComp = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date(GLOBAL_END_TIME);

        const updateTimer = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const timer = setInterval(updateTimer, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(timer);
    }, []);
    return (
        <div>
            <p>
                {timeLeft.days}  : {timeLeft.hours}  : {timeLeft.minutes}  : {timeLeft.seconds}
            </p>
        </div>
    )
}

export default TimerComp
