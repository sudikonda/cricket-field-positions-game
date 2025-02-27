import { Trophy, Play, Eye, Lightbulb } from 'lucide-react';
import type { GameState } from '../types';

type GameControlsProps = {
  score: number;
  gameStarted: boolean;
  currentPosition: { name: string } | null;
  isCorrect: boolean | null;
  hintsUsed: number;
  onStartGame: () => void;
  onShowHint: () => void;
  onToggleShowAllPositions: () => void;
};

const GameControls = ({
  score,
  gameStarted,
  currentPosition,
  isCorrect,
  hintsUsed,
  onStartGame,
  onShowHint,
  onToggleShowAllPositions
}: GameControlsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Cricket Field Positions</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            <span className="text-2xl font-bold">{score}</span>
          </div>
          {!gameStarted && (
            <button
              onClick={onStartGame}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play size={20} />
              Start Game
            </button>
          )}
        </div>
      </div>

      {gameStarted ? (
        <div className="text-center mb-6">
          <p className="text-xl">
            Find the position: <span className="font-bold text-green-600">{currentPosition?.name}</span>
          </p>
          {isCorrect !== null && (
            <p className={`text-lg mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? `Correct! +${10 - (hintsUsed * 2)} points` : 'Wrong! Try again'}
            </p>
          )}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={onShowHint}
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              title="Show hint (-2 points)"
            >
              <Lightbulb size={20} />
              Hint (-2 points)
            </button>
            <button
              onClick={onToggleShowAllPositions}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Eye size={20} />
              Show All Positions
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mb-6">
          <p className="text-xl">Click Start Game to begin learning cricket field positions!</p>
        </div>
      )}
    </div>
  );
};

export default GameControls;
