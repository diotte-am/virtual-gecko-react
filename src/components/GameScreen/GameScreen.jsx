import React from 'react';
import GameBoard from '../GameBoard/GameBoard';
import Dashboard from '../Dashboard/Dashboard';
import Controls from '../Controls/Controls';
import './GameScreen.css';

export default function GameScreen({ petName, stats, position, isAlive, onAction }) {
    
    const handleReset = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="game-screen-container">
            <header className="game-screen-header">
                <h1>Active Enclosure: {petName}</h1>
                <Dashboard stats={stats} />
            </header>

            <main className="game-screen-viewport">
                {isAlive ? (
                    <>
                        <GameBoard position={position} petName={petName} />
                        <Controls onAction={onAction} />
                    </>
                ) : (
                    <div className="game-screen-grave">
                        <h2>💀 Enclosure Critical Status</h2>
                        <p>{petName} has left the terrarium due to unmet stat thresholds.</p>
                        <button onClick={handleReset}>
                            Incubate New Habitant
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}