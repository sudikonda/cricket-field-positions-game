export interface Position {
  name: string;
  x: number;
  y: number;
}

export interface GameState {
  score: number;
  currentPosition: Position | null;
  isCorrect: boolean | null;
  attempts: number;
  gameStarted: boolean;
  showAllPositions: boolean;
  hintsUsed: number;
}