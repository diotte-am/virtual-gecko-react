// src/App.jsx
import React from 'react';
import { useGeckoEngine } from './hooks/useGeckoEngine';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import GameScreen from './components/GameScreen/GameScreen';

export default function App() {
    const { petName, stats, position, isAlive, registerPetName, handleAction, movePet } = useGeckoEngine();

    // If we have no pet name, render the Welcome view
    if (!petName) {
        return <WelcomeScreen onRegisterName={registerPetName} />;
    }

    // Otherwise, render the main game viewport loop
    return (
      <GameScreen 
          petName={petName}
          stats={stats}
          position={position}
          isAlive={isAlive}
          onAction={handleAction}
          onMovePet={movePet} // <-- Add this line
      />
  );
}