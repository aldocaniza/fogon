import { describe, it, expect, vi } from 'vitest';
import { GameState, Scene } from '../types';

// Mock the GameContext hook
vi.mock('../game/GameContext', () => ({
  useGame: vi.fn(),
}));

import { useNarrativeEngine } from '../game/narrativeEngine';
import { useGame } from '../game/GameContext';

function createMockState(overrides: Partial<GameState> = {}): GameState {
  return {
    currentScene: 'opening',
    flags: { visited_forest: true },
    phase: 'revealing',
    history: ['opening'],
    ...overrides,
  };
}

describe('narrativeEngine', () => {
  describe('getCurrentScene', () => {
    it('returns a scene for the current state', () => {
      (useGame as ReturnType<typeof vi.fn>).mockReturnValue({
        state: createMockState(),
        dispatch: vi.fn(),
      });

      const engine = useNarrativeEngine();
      const scene = engine.getCurrentScene();
      expect(scene).toBeDefined();
      expect(scene?.id).toBe('opening');
    });
  });

  describe('evaluateConditions', () => {
    it('returns true when all conditions match flags', () => {
      (useGame as ReturnType<typeof vi.fn>).mockReturnValue({
        state: createMockState({ flags: { visited_forest: true, has_key: false } }),
        dispatch: vi.fn(),
      });

      const engine = useNarrativeEngine();
      const result = engine.evaluateConditions({ visited_forest: true, has_key: false });
      expect(result).toBe(true);
    });

    it('returns false when any condition does not match', () => {
      (useGame as ReturnType<typeof vi.fn>).mockReturnValue({
        state: createMockState({ flags: { visited_forest: true } }),
        dispatch: vi.fn(),
      });

      const engine = useNarrativeEngine();
      const result = engine.evaluateConditions({ visited_forest: false });
      expect(result).toBe(false);
    });

    it('returns true for empty conditions', () => {
      (useGame as ReturnType<typeof vi.fn>).mockReturnValue({
        state: createMockState(),
        dispatch: vi.fn(),
      });

      const engine = useNarrativeEngine();
      const result = engine.evaluateConditions({});
      expect(result).toBe(true);
    });
  });

  describe('getVisibleChoices', () => {
    it('returns all choices when no requires conditions', () => {
      const scene: Scene = {
        id: 'test',
        title: 'Test',
        body: 'Body',
        mood: 'calm',
        choices: [
          { target: 'a', preview: 'Go A' },
          { target: 'b', preview: 'Go B' },
        ],
      };

      (useGame as ReturnType<typeof vi.fn>).mockReturnValue({
        state: createMockState(),
        dispatch: vi.fn(),
      });

      const engine = useNarrativeEngine();
      const visible = engine.getVisibleChoices(scene);
      expect(visible).toHaveLength(2);
    });

    it('filters choices whose requires conditions are not met', () => {
      const scene: Scene = {
        id: 'test',
        title: 'Test',
        body: 'Body',
        mood: 'ominous',
        choices: [
          { target: 'a', preview: 'Available', requires: { has_key: true } },
          { target: 'b', preview: 'Always visible' },
        ],
      };

      (useGame as ReturnType<typeof vi.fn>).mockReturnValue({
        state: createMockState({ flags: { has_key: false } }),
        dispatch: vi.fn(),
      });

      const engine = useNarrativeEngine();
      const visible = engine.getVisibleChoices(scene);
      expect(visible).toHaveLength(1);
      expect(visible[0].preview).toBe('Always visible');
    });
  });
});
