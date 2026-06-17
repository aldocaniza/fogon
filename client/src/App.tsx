import React from 'react';
import SceneView from './scenes/SceneView';
import { GameProvider } from './game/GameContext';
import { FireParticles } from './ui/FireParticles';
import './theme.css';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="app-container">
        <FireParticles />
        <SceneView />
      </div>
    </GameProvider>
  );
};

export default App;
