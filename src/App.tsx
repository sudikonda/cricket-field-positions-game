import React from 'react';
import Confetti from 'react-confetti';
import useCricketGame from './hooks/useCricketGame';
import FieldDisplay from './components/FieldDisplay';
import GameControls from './components/GameControls';

function App() {
  const {
    showConfetti,
    gameState,
    startGame,
    handlePositionClick,
    toggleShowAllPositions,
    showHint
  } = useCricketGame();

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
        <GameControls
          score={gameState.score}
          gameStarted={gameState.gameStarted}
          currentPosition={gameState.currentPosition}
          isCorrect={gameState.isCorrect}
          hintsUsed={gameState.hintsUsed}
          onStartGame={startGame}
          onShowHint={showHint}
          onToggleShowAllPositions={toggleShowAllPositions}
        />

        <FieldDisplay
          gameStarted={gameState.gameStarted}
          showAllPositions={gameState.showAllPositions}
          currentPosition={gameState.currentPosition}
          isCorrect={gameState.isCorrect}
          onPositionClick={handlePositionClick}
        />
      </div>
    </div>
  );
}

export default App;
