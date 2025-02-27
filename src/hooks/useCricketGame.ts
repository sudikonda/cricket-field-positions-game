import { useState, useCallback } from 'react';
import { positions } from '../positions';
import type { Position, GameState } from '../types';

const useCricketGame = () => {
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

  const handlePositionClick = useCallback((clickedPosition: Position) => {
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
  }, [gameState]);

  const toggleShowAllPositions = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showAllPositions: !prev.showAllPositions
    }));
  }, []);

  const showHint = useCallback(() => {
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
  }, []);

  return {
    showConfetti,
    gameState,
    startGame,
    handlePositionClick,
    toggleShowAllPositions,
    showHint,
  };
};

export default useCricketGame;
