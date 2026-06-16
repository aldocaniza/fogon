import React from 'react';
import { useGame } from '../game/GameContext';
import { Scene } from '../types';

const ChoiceList: React.FC = () => {
  const { state, dispatch } = useGame();
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);

  // Mock scene data - in a real implementation, this would come from the narrative engine
  const scene: Scene = {
    id: state.currentScene,
    title: 'The Crackling Fire',
    body: 'You wake at 3am to the sound of crackling fire...',
    mood: 'ominous',
    choices: [
      { target: 'investigate', preview: 'Investigate the fire', requires: {}, sets: { has_investigated_fire: true } },
      { target: 'remember', preview: 'Try to remember what happened', requires: {}, sets: { tried_to_remember: true } },
      { target: 'flee', preview: 'Leave the room immediately', requires: {}, sets: { fled_room: true } }
    ]
  };

  useEffect(() => {
    setCurrentScene(scene);
  }, [state.currentScene]);

  const handleChoice = (choiceIndex: number) => {
    dispatch({ type: 'CHOOSE', choiceIndex });
  };

  if (state.phase !== 'choosing' || !currentScene) {
    return null;
  }

  return (
    <div className="choice-list">
      <h2 className="text-xl font-semibold mb-4">What do you do?</h2>
      <div className="space-y-3">
        {currentScene.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoice(index)}
            className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {choice.preview}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoiceList;
