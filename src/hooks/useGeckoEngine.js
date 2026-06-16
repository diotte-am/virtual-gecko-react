import { useState, useEffect } from 'react';
import { INITIAL_STATS, DECAY_RATES, PENALTIES } from '../config/gameConfig';

export function useGeckoEngine() {
    const [petName, setPetName] = useState(() => localStorage.getItem('virtualGeckoName') || '');
    const [stats, setStats] = useState(INITIAL_STATS);
    const [position, setPosition] = useState({ x: 5, y: 5 });
    const [isAlive, setIsAlive] = useState(true);

    useEffect(() => {
        if (!petName || !isAlive) return;

        const heartbeat = setInterval(() => {
            setStats((prev) => {
                // 1. Calculate cascading conditional states
                const isStarvingOrCold = prev.food <= 0 || prev.warmth <= 0;
                const isSickOrBored = prev.health <= 0 || prev.interest <= 0;

                // 2. Determine targeted decay speeds based on conditional rules
                const currentHealthDecay = isStarvingOrCold ? PENALTIES.CRITICAL_DECAY : DECAY_RATES.health;
                const currentMoodDecay = isSickOrBored ? PENALTIES.CRITICAL_DECAY : DECAY_RATES.mood;

                const nextStats = {
                    food: Math.max(0, prev.food + DECAY_RATES.food),
                    warmth: Math.max(0, prev.warmth + DECAY_RATES.warmth),
                    interest: Math.max(0, prev.interest + DECAY_RATES.interest),
                    // Health drops drastically if food or warmth hits 0
                    health: Math.max(0, prev.health + currentHealthDecay),
                    // Mood drops drastically if health or interest hits 0
                    mood: Math.max(0, prev.mood + currentMoodDecay),
                };

                // 3. Complete Game Over Condition check (Zero Health or Zero Mood)
                if (nextStats.health <= 0 || nextStats.mood <= 0) {
                    setIsAlive(false);
                }

                return nextStats;
            });
        }, 1000);

        return () => clearInterval(heartbeat);
    }, [petName, isAlive]);

    // Position Placement Controller (with Annoyance side effect)
    const movePet = (newX, newY) => {
        if (!isAlive) return;
        
        // Update matrix position
        setPosition({ x: newX, y: newY });
        
        // Instantly apply the handling mood penalty
        setStats((prev) => ({
            ...prev,
            mood: Math.max(0, prev.mood + PENALTIES.HANDLING_ANNOYANCE)
        }));
    };

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
                case 'feed': return { ...prev, food: Math.min(100, prev.food + 15), health: Math.min(100, prev.health + 5) };
                case 'play': return { ...prev, interest: Math.min(100, prev.interest + 20), mood: Math.min(100, prev.mood + 10) };
                default: return prev;
            }
        });
    };

    return { petName, stats, position, isAlive, registerPetName, handleAction, movePet };
}