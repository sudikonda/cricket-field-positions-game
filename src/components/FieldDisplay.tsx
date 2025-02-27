import type { Position } from '../types';
import { positions } from '../positions';

type FieldDisplayProps = {
  gameStarted: boolean;
  showAllPositions: boolean;
  currentPosition: Position | null;
  isCorrect: boolean | null;
  onPositionClick: (position: Position) => void;
};

const FieldDisplay = ({
  gameStarted,
  showAllPositions,
  currentPosition,
  isCorrect,
  onPositionClick
}: FieldDisplayProps) => {
  return (
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
            onClick={() => onPositionClick(position)}
            disabled={!gameStarted}
            title={gameStarted ? `Select ${position.name}` : 'Start game to select positions'}
            className={`w-4 h-4 rounded-full transition-colors
              ${gameStarted ? 'cursor-pointer hover:bg-blue-400' : 'cursor-not-allowed'}
              ${position.name === currentPosition?.name && isCorrect ? 'bg-green-400' : 
                position.name === currentPosition?.name && isCorrect === false ? 'bg-red-400' : 
                'bg-white'}`}
          />
          {(showAllPositions || !gameStarted) && (
            <div className="absolute left-1/2 top-full mt-1 transform -translate-x-1/2 whitespace-nowrap">
              <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {position.name}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FieldDisplay;
