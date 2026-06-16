import { GameState } from '../types';

const STORAGE_KEY = 'fogon_session';

export interface StorageManager {
  save: (state: GameState) => void;
  load: () => GameState | null;
  clear: () => void;
}

export function useStorage(): StorageManager {
  const save = (state: GameState) => {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  };

  const load = (): GameState | null => {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) return null;
      return JSON.parse(serialized);
    } catch (error) {
      console.error('Failed to load game state:', error);
      return null;
    }
  };

  const clear = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear game state:', error);
    }
  };

  return { save, load, clear };
}
