import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useStorage } from '../game/storage';
import { GameState } from '../types';

describe('storage', () => {
  const mockState: GameState = {
    currentScene: 'forest',
    flags: { visited_forest: true },
    phase: 'choosing',
    history: ['opening', 'forest'],
  };

  beforeEach(() => {
    const store: Record<string, string> = {};
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(
      (key: string) => store[key] ?? null
    );
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(
      (key: string, value: string) => { store[key] = value; }
    );
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(
      (key: string) => { delete store[key]; }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('saves game state to localStorage', () => {
    const { result } = renderHook(() => useStorage());
    result.current.save(mockState);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'fogon_session',
      JSON.stringify(mockState)
    );
  });

  it('loads previously saved state', () => {
    const { result } = renderHook(() => useStorage());
    result.current.save(mockState);

    const { result: loaded } = renderHook(() => useStorage());
    const state = loaded.current.load();
    expect(state).toEqual(mockState);
  });

  it('returns null when no saved state exists', () => {
    const { result } = renderHook(() => useStorage());
    const state = result.current.load();
    expect(state).toBeNull();
  });

  it('clears saved state', () => {
    const { result } = renderHook(() => useStorage());
    result.current.save(mockState);
    result.current.clear();
    expect(localStorage.removeItem).toHaveBeenCalledWith('fogon_session');
  });

  it('handles JSON parse errors gracefully', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('invalid json');
    const { result } = renderHook(() => useStorage());
    const state = result.current.load();
    expect(state).toBeNull();
  });
});
