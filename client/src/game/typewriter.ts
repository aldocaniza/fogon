import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function useTypewriter({ text, speed = 50, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTyping = () => {
    setIsTyping(true);
    setIsComplete(false);
    setDisplayedText('');
    let i = 0;

    intervalRef.current = setInterval(() => {
      setDisplayedText(prev => prev + text[i]);
      i++;

      if (i >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsTyping(false);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, speed);
  };

  const skipTyping = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayedText(text);
    setIsTyping(false);
    setIsComplete(true);
    if (onComplete) onComplete();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { displayedText, isTyping, isComplete, startTyping, skipTyping };
}
