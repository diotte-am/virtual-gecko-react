import React from 'react';
import { GRID_SIZE } from '../../config/gameConfig';
import './GameBoard.css';

export default function GameBoard({ position, petName, onMovePet }) {
    const cells = [];

    // Drag Initialization Phase
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', 'lizard'); 
        // Changes drag image to look natural
        e.dataTransfer.effectAllowed = 'move';
    };

    // Allow drops over these elements
    const handleDragOver = (e) => {
        e.preventDefault(); 
    };

    // Handle Drop Target Evaluation
    const handleDrop = (e, targetX, targetY) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        if (data === 'lizard') {
            onMovePet(targetX, targetY);
        }
    };

    for (let row = 1; row <= GRID_SIZE; row++) {
        for (let col = 1; col <= GRID_SIZE; col++) {
            const hasLizard = position.x === col && position.y === row;

            cells.push(
                <div 
                    key={`${col}-${row}`} 
                    className="grid-cell"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, col, row)}
                >
                    {hasLizard && (
                        <div 
                            className="lizard-sprite" 
                            draggable
                            onDragStart={handleDragStart}
                        >
                            🦎
                            <span className="lizard-label">{petName}</span>
                        </div>
                    )}
                </div>
            );
        }
    }

    return <div className="enclosure-grid">{cells}</div>;
}