// src/components/GameBoard.jsx
import React from 'react';
import { GRID_SIZE } from '../../config/gameConfig';
import './GameBoard.css'; // We'll add the styling next!

export default function GameBoard({ position, petName }) {
    const totalCells = GRID_SIZE * GRID_SIZE;
    const cells = [];

    // Build the 10x10 matrix layout grid (Rows 1-10, Columns 1-10)
    for (let row = 1; row <= GRID_SIZE; row++) {
        for (let col = 1; col <= GRID_SIZE; col++) {
            // Check if the lizard is sitting in this exact coordinate cell
            const hasLizard = position.x === col && position.y === row;

            cells.push(
                <div key={`${col}-${row}`} className="grid-cell">
                    {hasLizard && (
                        <div className="lizard-sprite" title={petName}>
                            🦎 <span className="lizard-label">{petName}</span>
                        </div>
                    )}
                </div>
            );
        }
    }

    return <div className="enclosure-grid">{cells}</div>;
}