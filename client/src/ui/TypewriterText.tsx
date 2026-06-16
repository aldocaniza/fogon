import React from 'react';
import { useGame } from '../game/GameContext';
import { useTypewriter } from '../game/typewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50 }) => {
  const { displayedText, startTyping, skipTyping, isTyping } = useTypewriter({ text, speed });

  React.useEffect(() => {
    startTyping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSkip = () => {
    if (isTyping) {
      skipTyping();
    }
  };

  return (
    <span onClick={handleSkip} className="cursor-pointer">
      {displayedText}
    </span>
  );
};

export default TypewriterText;
