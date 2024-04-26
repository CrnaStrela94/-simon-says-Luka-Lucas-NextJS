import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { startGame, addUserInput, resetGame } from "../store/gameSlice";
import Button from "./Button";
import GameControls from "./GameControls";

const SimonGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sequence, gameStarted, gameOver } = useAppSelector(
    (state) => state.game
  );
  const [highlightedButton, setHighlightedButton] = useState<number | null>(
    null
  );
  const [successfulGamesCount, setSuccessfulGamesCount] = useState(0);
  const [nextButtonIndex, setNextButtonIndex] = useState(0);

  useEffect(() => {
    if (gameOver) {
      setSuccessfulGamesCount(0);
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      // Display sequence
      sequence.forEach((buttonIndex, index) => {
        setTimeout(() => {
          setHighlightedButton(buttonIndex);
          setTimeout(() => {
            setHighlightedButton(null);
          }, 500);
        }, index * 1000); // Adjust the delay as needed
      });
    }
  }, [gameStarted, gameOver, sequence]);

  const handleUserInput = (index: number) => {
    dispatch(addUserInput(index));
    if (index === sequence[nextButtonIndex]) {
      setNextButtonIndex(nextButtonIndex + 1);
      setSuccessfulGamesCount((count) => count + 1);
    } else {
      // Handle incorrect input
    }
  };

  const handleStartGame = () => {
    dispatch(startGame());
    setNextButtonIndex(0);
  };

  const handleResetGame = () => {
    dispatch(resetGame());
    setNextButtonIndex(0);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="flex mb-4">
        <Button
          color="red"
          onClick={() => handleUserInput(0)}
          disabled={!gameStarted || gameOver}
          highlighted={highlightedButton === 0}
        />
        <Button
          color="blue"
          onClick={() => handleUserInput(1)}
          disabled={!gameStarted || gameOver}
          highlighted={highlightedButton === 1}
        />
      </div>
      <div className="flex">
        <Button
          color="yellow"
          onClick={() => handleUserInput(2)}
          disabled={!gameStarted || gameOver}
          highlighted={highlightedButton === 2}
        />
        <Button
          color="green"
          onClick={() => handleUserInput(3)}
          disabled={!gameStarted || gameOver}
          highlighted={highlightedButton === 3}
        />
      </div>

      <div className="mt-8">
        <GameControls
          gameStarted={gameStarted}
          gameOver={gameOver}
          onStartGame={handleStartGame}
          onResetGame={handleResetGame}
          successfulGamesCount={successfulGamesCount}
        />
      </div>
    </div>
  );
};

export default SimonGame;
