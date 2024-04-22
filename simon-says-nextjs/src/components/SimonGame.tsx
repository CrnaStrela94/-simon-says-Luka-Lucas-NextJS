import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startGame, addUserInput, resetGame } from '../store/gameSlice';
import { AppDispatch } from '@/store/store';

const SimonGame: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sequence, userSequence, gameStarted, gameOver } = useAppSelector(state => state.game);
    const [highlightedButton, setHighlightedButton] = useState<number | null>(null);
    const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({});
    const [successfulGamesCount, setSuccessfulGamesCount] = useState(0);

    useEffect(() => {
        setSounds({
            tone1: new Audio('/sounds/tone1.mp3'),
            tone2: new Audio('/sounds/tone2.mp3'),
            tone3: new Audio('/sounds/tone3.mp3'),
            tone4: new Audio('/sounds/tone4.mp3'),
            gameOver: new Audio('/sounds/gameOver.mp3')
        });
    }, []);

    const playSound = (sound: HTMLAudioElement) => {
        sound.currentTime = 0;
        sound.play();
    };

    const handleStartGame = () => {
        dispatch(startGame());
    };
    const handleResetGame = () => {
        dispatch(resetGame());
    };

    const handleUserInput = (index: number) => {
        dispatch(addUserInput(index));
        playSound((sounds as Record<string, HTMLAudioElement>)[`tone${index + 1}`]);
    };


    const showSequence = (sequence: number[], dispatch: AppDispatch): void => {
        sequence.forEach((value, index) => {
            setTimeout(() => {
                setHighlightedButton(value);
                setTimeout(() => {
                    setHighlightedButton(null);
                }, 500); // Highlight for 500ms
            }, 1000 * index); // Each button highlights 1 second after the previous
        });
    }

    useEffect(() => {
        if (gameStarted && !gameOver) {
            showSequence(sequence, dispatch);
        }
    }, [gameStarted, sequence, dispatch, gameOver]);

    useEffect(() => {
        if (gameOver && sequence.length === userSequence.length) {
            setSuccessfulGamesCount(prevCount => prevCount + 1);
            playSound(sounds.gameOver);
        }
    }, [gameOver, sequence, userSequence]);

    return (
        <div className="flex flex-wrap justify-center p-4">
            <button
                className={`w-64 h-64 m-2 rounded-full ${highlightedButton === 0 ? 'bg-red-700' : 'bg-red-500'}`}
                onClick={() => handleUserInput(0)}
                disabled={!gameStarted || gameOver}
            />
            <button
                className={`w-64 h-64 m-2 rounded-full ${highlightedButton === 1 ? 'bg-blue-700' : 'bg-blue-500'}`}
                onClick={() => handleUserInput(1)}
                disabled={!gameStarted || gameOver}
            />
            <button
                className={`w-64 h-64 m-2 rounded-full ${highlightedButton === 2 ? 'bg-yellow-700' : 'bg-yellow-500'}`}
                onClick={() => handleUserInput(2)}
                disabled={!gameStarted || gameOver}
            />
            <button
                className={`w-64 h-64 m-2 rounded-full ${highlightedButton === 3 ? 'bg-green-700' : 'bg-green-500'}`}
                onClick={() => handleUserInput(3)}
                disabled={!gameStarted || gameOver}
            />
            <div className="mt-4">
                <div>Succesful Games: {successfulGamesCount}</div>
                {!gameStarted ? (
                    <button
                        className="px-4 py-2 bg-purple-600 text-white rounded"
                        onClick={handleStartGame}
                    >
                        Start Game
                    </button>
                ) : gameOver ? (
                    <>
                        <div className="text-xl font-bold text-red-500">Game Over!</div>
                        <button
                            className="px-4 py-2 mt-2 bg-purple-600 text-white rounded"
                            onClick={handleResetGame}
                        >
                            Restart Game
                        </button>
                    </>
                ) : (
                    <div className="text-xl font-bold text-green-500">Follow the sequence!</div>
                )}
            </div>
        </div>
    );
};

export default SimonGame;


