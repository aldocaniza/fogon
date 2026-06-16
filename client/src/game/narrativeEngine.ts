import { Scene, GameState } from '../types';
import { useGame } from './GameContext';

interface NarrativeEngine {
  getCurrentScene: () => Scene | undefined;
  evaluateConditions: (conditions: Record<string, boolean>) => boolean;
  getVisibleChoices: (scene: Scene) => Scene['choices'];
}

export function useNarrativeEngine(): NarrativeEngine {
  const { state } = useGame();

  const getCurrentScene = (): Scene | undefined => {
    // In a real implementation, this would fetch from an API or local storage
    // For now, we'll use the initial state
    return {
      id: state.currentScene,
      title: 'Sample Scene',
      body: 'This is a sample scene body.',
      mood: 'calm',
      choices: [
        { target: 'next', preview: 'Continue' }
      ]
    };
  };

  const evaluateConditions = (conditions: Record<string, boolean>): boolean => {
    return Object.entries(conditions).every(([key, value]) => {
      return state.flags[key] === value;
    });
  };

  const getVisibleChoices = (scene: Scene): Scene['choices'] => {
    return scene.choices.filter(choice => {
      if (!choice.requires) return true;
      return evaluateConditions(choice.requires);
    });
  };

  return { getCurrentScene, evaluateConditions, getVisibleChoices };
}
