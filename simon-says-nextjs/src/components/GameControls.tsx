import React from "react";

interface GameControlsProps {
  gameStarted: boolean;
  gameOver: boolean;
  onStartGame: () => void;
  onResetGame: () => void;
  successfulGamesCount: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStarted,
  gameOver,
  onStartGame,
  onResetGame,
  successfulGamesCount,
}) => (
  <div className="mt-4">
    <div className="text-lg font-bold mb-2">
      Successful Games: {successfulGamesCount}
    </div>
    {!gameStarted ? (
      <button
        className="px-4 py-2 bg-purple-600 text-white rounded"
        onClick={onStartGame}
      >
        Start Game
      </button>
    ) : gameOver ? (
      <>
        <div className="text-xl font-bold text-red-500 mb-2">Game Over!</div>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded"
          onClick={onResetGame}
        >
          Restart Game
        </button>
      </>
    ) : (
      <div className="text-xl font-bold text-green-500">
        Follow the sequence!
      </div>
    )}
  </div>
);

export default GameControls;
