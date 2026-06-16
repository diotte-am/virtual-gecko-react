import { useState, useEffect } from 'react';
import { INITIAL_STATS, DECAY_RATES, GRID_SIZE } from '../config/gameConfig';

export function useGeckoEngine() {
    // 1. Check localStorage for an existing pet name on initialization
    const [petName, setPetName] = useState(() => {
        return localStorage.getItem('virtualGeckoName') || '';
    });

    const [stats, setStats] = useState(INITIAL_STATS);
    // Position tracking: start right in the center of our 10x10 matrix
    const [position, setPosition] = useState({ x: 5, y: 5 });
    const [isAlive, setIsAlive] = useState(true);

    // 2. The Heartbeat Loop (only runs if a pet has been named and is alive)
    useEffect(() => {
        if (!petName || !isAlive) return;

        const heartbeat = setInterval(() => {
            setStats((prev) => {
                const nextStats = {
                    food: Math.max(0, prev.food + DECAY_RATES.food),
                    interest: Math.max(0, prev.interest + DECAY_RATES.interest),
                    warmth: Math.max(0, prev.warmth + DECAY_RATES.warmth),
                };

                if (nextStats.food <= 0 || nextStats.interest <= 0 || nextStats.warmth <= 0) {
                    setIsAlive(false);
                }
                return nextStats;
            });
        }, 1000);

        return () => clearInterval(heartbeat);
    }, [petName, isAlive]);

    // Action function to register a new lizard name
    const registerPetName = (name) => {
        const trimmedName = name.trim();
        if (trimmedName) {
            localStorage.setItem('virtualGeckoName', trimmedName);
            setPetName(trimmedName);
        }
    };

    const handleAction = (actionType) => {
        if (!isAlive) return;
        setStats((prev) => {
            switch (actionType) {
                case 'feed': return { ...prev, food: Math.min(100, prev.food + 15) };
                case 'play': return { ...prev, interest: Math.min(100, prev.interest + 20) };
                default: return prev;
            }
        });
    };

    return { petName, stats, position, isAlive, registerPetName, handleAction };
}