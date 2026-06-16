// src/config/gameConfig.js

export const GRID_SIZE = 10;

export const INITIAL_STATS = {
    food: 100,
    warmth: 100,
    interest: 100,
    health: 100,
    mood: 100
};

export const DECAY_RATES = {
    food: -0.6,
    warmth: -0.4,
    interest: -0.8,
    health: -0.5, // Natural health decay base
    mood: -0.3    // Natural mood decay base
};

// Stat penalties for cascading effects
export const PENALTIES = {
    CRITICAL_DECAY: -2.5,   // How fast health/mood drops when prerequisites hit 0
    HANDLING_ANNOYANCE: -15 // Instant mood drop when picked up and moved
};