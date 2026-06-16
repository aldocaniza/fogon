import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';
import { GameState, Scene } from '../types';
import storyData from '../../story/fogon-chapter-1.json';

type Action =
  | { type: 'INIT' }
  | { type: 'GO_TO_SCENE'; sceneId: string }
  | { type: 'CHOOSE'; choiceIndex: number }
  | { type: 'SET_FLAG'; key: string; value: boolean };

const initialState: GameState = {
  currentScene: 'start',
  flags: {},
  phase: 'loading',
  history: [],
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'INIT': {
      const startScene = (storyData.scenes as Scene[]).find(s => s.id === 'start');
      return { ...state, currentScene: startScene?.id ?? 'start', phase: 'revealing', history: [] };
    }
    case 'GO_TO_SCENE': {
      return { ...state, currentScene: action.sceneId, phase: 'revealing', history: [...state.history, action.sceneId] };
    }
    case 'CHOOSE': {
      // Find current scene
      const current = (storyData.scenes as Scene[]).find(s => s.id === state.currentScene);
      if (!current) return state;
      const choice = current.choices[action.choiceIndex];
      if (!choice) return state;
      // Apply flag sets
      const newFlags = { ...state.flags };
      if (choice.sets) {
        Object.entries(choice.sets).forEach(([k, v]) => {
          newFlags[k] = v;
        });
      }
      return { ...state, flags: newFlags, currentScene: choice.target, phase: 'revealing', history: [...state.history, choice.target] };
    }
    case 'SET_FLAG': {
      return { ...state, flags: { ...state.flags, [action.key]: action.value } };
    }
    default:
      return state;
  }
}

interface GameContextProps {
  state: GameState;
  dispatch: Dispatch<Action>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
