import React from 'react';
import './Dashboard.css';

export default function Dashboard({ stats }) {
    return (
        <div className="stats-dashboard">
            {/* Core Physical Vitals */}
            <div className="stat-card">
                <span className="stat-icon">🦗</span>
                <span className="stat-label">Food:</span>
                <span className="stat-value">{Math.round(stats.food)}%</span>
            </div>
            
            <div className="stat-card">
                <span className="stat-icon">☀️</span>
                <span className="stat-label">Warmth:</span>
                <span className="stat-value">{Math.round(stats.warmth)}%</span>
            </div>

            <div className="stat-card">
                <span className="stat-icon">🎯</span>
                <span className="stat-label">Interest:</span>
                <span className="stat-value">{Math.round(stats.interest)}%</span>
            </div>

            {/* New Metrics Section */}
            <div className="stat-card highlight-health">
                <span className="stat-icon">❤️</span>
                <span className="stat-label">Health:</span>
                <span className="stat-value">{Math.round(stats.health)}%</span>
            </div>

            <div className="stat-card highlight-mood">
                <span className="stat-icon">🎭</span>
                <span className="stat-label">Mood:</span>
                <span className="stat-value">{Math.round(stats.mood)}%</span>
            </div>
        </div>
    );
}