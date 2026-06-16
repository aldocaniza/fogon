import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypewriter } from '../game/typewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial empty state', () => {
    const { result } = renderHook(() => useTypewriter({ text: 'Hello' }));
    expect(result.current.displayedText).toBe('');
    expect(result.current.isTyping).toBe(false);
    expect(result.current.isComplete).toBe(false);
  });

  it('reveals text character by character after startTyping', () => {
    const { result } = renderHook(() => useTypewriter({ text: 'Hi', speed: 50 }));

    act(() => {
      result.current.startTyping();
    });

    expect(result.current.isTyping).toBe(true);

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current.displayedText).toBe('H');

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current.displayedText).toBe('Hi');
    expect(result.current.isTyping).toBe(false);
    expect(result.current.isComplete).toBe(true);
  });

  it('skipTyping reveals full text immediately', () => {
    const { result } = renderHook(() => useTypewriter({ text: 'Skip me' }));

    act(() => {
      result.current.startTyping();
    });

    act(() => {
      result.current.skipTyping();
    });

    expect(result.current.displayedText).toBe('Skip me');
    expect(result.current.isTyping).toBe(false);
    expect(result.current.isComplete).toBe(true);
  });

  it('calls onComplete when typing finishes', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useTypewriter({ text: 'A', speed: 50, onComplete }));

    act(() => {
      result.current.startTyping();
    });

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(onComplete).toHaveBeenCalledOnce();
  });

  it('calls onComplete on skip', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useTypewriter({ text: 'Long text', speed: 999, onComplete }));

    act(() => {
      result.current.startTyping();
    });

    act(() => {
      result.current.skipTyping();
    });

    expect(onComplete).toHaveBeenCalledOnce();
  });

  it('clears interval on unmount', () => {
    const clearSpy = vi.spyOn(global, 'clearInterval');
    const { result, unmount } = renderHook(() => useTypewriter({ text: 'Test', speed: 100 }));

    act(() => {
      result.current.startTyping();
    });

    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
