import React, { useState, useCallback } from 'react';
import Confetti from 'react-confetti';
import { Trophy, Play, Eye, Lightbulb } from 'lucide-react';
import { positions } from './positions';
import type { Position, GameState } from './types';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    currentPosition: null,
    isCorrect: null,
    attempts: 0,
    gameStarted: false,
    showAllPositions: false,
    hintsUsed: 0,
  });

  const startGame = useCallback(() => {
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    setGameState({
      score: 0,
      currentPosition: randomPosition,
      isCorrect: null,
      attempts: 0,
      gameStarted: true,
      showAllPositions: false,
      hintsUsed: 0,
    });
  }, []);

  const handlePositionClick = (clickedPosition: Position) => {
    if (!gameState.currentPosition || !gameState.gameStarted) return;

    const isCorrect = clickedPosition.name === gameState.currentPosition.name;
    const newScore = isCorrect ? gameState.score + 10 - (gameState.hintsUsed * 2) : gameState.score;
    const newAttempts = gameState.attempts + 1;

    setGameState(prev => ({
      ...prev,
      score: newScore,
      isCorrect,
      attempts: newAttempts,
      showAllPositions: false,
    }));

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    // Set next position after a delay
    setTimeout(() => {
      const nextPosition = positions[Math.floor(Math.random() * positions.length)];
      setGameState(prev => ({
        ...prev,
        currentPosition: nextPosition,
        isCorrect: null,
        hintsUsed: 0,
      }));
    }, 1500);
  };

  const toggleShowAllPositions = () => {
    setGameState(prev => ({
      ...prev,
      showAllPositions: !prev.showAllPositions
    }));
  };

  const showHint = () => {
    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
      showAllPositions: true
    }));

    // Hide positions after 2 seconds
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showAllPositions: false
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-600 p-8 relative">
      {showConfetti && <Confetti 
        gravity={0.1}
        initialVelocityY={-20}
        wind={0.05}
        friction={0.99}
        recycle={false}
        colors={['#FFC700', '#FF0000', '#2E3191', '#41BBC7']}
        numberOfPieces={400}
        tweenDuration={3000}
      />}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Cricket Field Positions</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" />
                <span className="text-2xl font-bold">{gameState.score}</span>
              </div>
              {!gameState.gameStarted && (
                <button
                  onClick={startGame}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Play size={20} />
                  Start Game
                </button>
              )}
            </div>
          </div>

          {gameState.gameStarted ? (
            <div className="text-center mb-6">
              <p className="text-xl">
                Find the position: <span className="font-bold text-green-600">{gameState.currentPosition?.name}</span>
              </p>
              {gameState.isCorrect !== null && (
                <p className={`text-lg mt-2 ${gameState.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {gameState.isCorrect ? `Correct! +${10 - (gameState.hintsUsed * 2)} points` : 'Wrong! Try again'}
                </p>
              )}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={showHint}
                  className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  title="Show hint (-2 points)"
                >
                  <Lightbulb size={20} />
                  Hint (-2 points)
                </button>
                <button
                  onClick={toggleShowAllPositions}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Eye size={20} />
                  {gameState.showAllPositions ? 'Hide Positions' : 'Show All Positions'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mb-6">
              <p className="text-xl">Click Start Game to begin learning cricket field positions!</p>
            </div>
          )}
        </div>

        <div className="relative w-full aspect-square bg-green-500 rounded-full overflow-hidden shadow-xl">
          {/* Field markings */}
          <div className="absolute w-px h-full bg-white left-1/2 top-0 opacity-50"></div>
          <div className="absolute w-full h-px bg-white top-1/2 left-0 opacity-50"></div>

          {/* Cricket Pitch */}
          <div className="absolute left-1/2 top-1/2 w-16 h-64 bg-green-400 border-2 border-white transform -translate-x-1/2 -translate-y-1/2">
            {/* Crease lines */}
            <div className="absolute top-12 w-full h-1 bg-white">
              {/* Batsman markers */}
              <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="absolute bottom-12 w-full h-1 bg-white">
              {/* Bowler markers */}
              <div className="absolute left-1/2 bottom-[12%] w-3 h-3 bg-black rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>

          {/* Positions */}
          {positions.map((position) => (
            <div key={position.name} className="absolute" style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}>
              <button
                onClick={() => handlePositionClick(position)}
                disabled={!gameState.gameStarted}
                title={gameState.gameStarted ? `Select ${position.name}` : 'Start game to select positions'}
                className={`w-4 h-4 rounded-full transition-colors
                  ${gameState.gameStarted ? 'cursor-pointer hover:bg-blue-400' : 'cursor-not-allowed'}
                  ${position.name === gameState.currentPosition?.name && gameState.isCorrect ? 'bg-green-400' : 
                    position.name === gameState.currentPosition?.name && gameState.isCorrect === false ? 'bg-red-400' : 
                    'bg-white'}`}
              />
              {(gameState.showAllPositions || !gameState.gameStarted) && (
                <div className="absolute left-1/2 top-full mt-1 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {position.name}
                  </span>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;
