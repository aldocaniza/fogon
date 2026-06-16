import React from 'react';
import { useGame } from '../game/GameContext';
import { useTypewriter } from '../game/typewriter';
import { Scene } from '../types';
import { useTypewriter as UseTypewriterHook } from '../game/typewriter';

const SceneView: React.FC = () => {
  const { state } = useGame();
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  // In a real implementation, this would fetch the actual scene data
  const scene: Scene = {
    id: state.currentScene,
    title: 'The Crackling Fire',
    body: 'You wake at 3am to the sound of crackling fire. The room is dimly lit by flames dancing in a stone hearth. You mutter words in an archaic language you don\'t recognize...',
    mood: 'ominous',
    choices: [
      { target: 'investigate', preview: 'Investigate the fire' },
      { target: 'remember', preview: 'Try to remember what happened' },
      { target: 'flee', preview: 'Leave the room immediately' }
    ]
  };

  useEffect(() => {
    setCurrentScene(scene);
  }, [state.currentScene]);

  const handleTypingComplete = () => {
    setIsTyping(false);
  };

  const startTyping = () => {
    setIsTyping(true);
    // This would use the typewriter hook in a real implementation
    // For now, we'll set the text immediately
    setDisplayedText(scene.body);
  };

  useEffect(() => {
    if (currentScene && state.phase === 'revealing') {
      startTyping();
    }
  }, [currentScene, state.phase]);

  const getMoodClass = (mood: Scene['mood']) => {
    switch (mood) {
      case 'ominous': return 'text-amber-400';
      case 'curious': return 'text-blue-400';
      case 'calm': return 'text-green-400';
      case 'urgent': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="scene-view">
      <h1 className={`text-3xl font-bold mb-4 ${getMoodClass(scene.mood)}`}>
        {scene.title}
      </h1>
      <div className="prose prose-invert max-w-none">
        {displayedText}
      </div>
      {isTyping && (
        <div className="typing-indicator">
          <span className="animate-pulse">|</span>
        </div>
      )}
    </div>
  );
};

export default SceneView;
