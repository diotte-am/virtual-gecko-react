import React, { useState } from 'react';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onRegisterName }) {
    const [inputName, setInputName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegisterName(inputName);
    };

    return (
        <div className="welcome-overlay">
            <div className="welcome-card">
                <h2>Welcome to Terrarium OS 🦎</h2>
                <p>You don't seem to have a gecko companion in this sector yet. Let's incubate one! What will you name them?</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        maxLength="12"
                        placeholder="e.g. Gordon" 
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        required
                    />
                    <button type="submit">Adopt Companion</button>
                </form>
            </div>
        </div>
    );
}