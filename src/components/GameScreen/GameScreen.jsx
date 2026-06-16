import React from 'react';
import GameBoard from '../GameBoard/GameBoard';
import Dashboard from '../Dashboard/Dashboard';
import Controls from '../Controls/Controls';
import './GameScreen.css';

export default function GameScreen({ petName, stats, position, isAlive, onAction, onMovePet }) {
    
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
                        {/* Connected our movement function down to the grid */}
                        <GameBoard position={position} petName={petName} onMovePet={onMovePet} />
                        <Controls onAction={onAction} />
                    </>
                ) : (
                    <div className="game-screen-grave">
                        <h2>💀 Enclosure Critical Status</h2>
                        <p>{petName} has passed away due to critical health or mood failure.</p>
                        <button onClick={handleReset}>Incubate New Habitant</button>
                    </div>
                )}
            </main>
        </div>
    );
}