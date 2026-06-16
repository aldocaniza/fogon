import React from 'react';
import { useGame } from '../game/GameContext';

const Epilogue: React.FC = () => {
  const { state, dispatch } = useGame();

  const handleRestart = () => {
    dispatch({ type: 'INIT' });
  };

  if (state.phase !== 'epilogue') {
    return null;
  }

  return (
    <div className="epilogue">
      <h1 className="text-3xl font-bold mb-6">The End</h1>
      <div className="prose prose-invert max-w-none mb-8">
        <p>Your journey through the fog has reached its conclusion. The flames now dance alone in the hearth, and the shadows have returned to their corners.</p>
        <p className="mt-4">You've discovered secrets about yourself and the world around you, but many questions remain unanswered.</p>
      </div>
      <button
        onClick={handleRestart}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
      >
        Start New Journey
      </button>
    </div>
  );
};

export default Epilogue;
