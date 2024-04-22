import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
    sequence: number[];
    userSequence: number[];
    gameStarted: boolean;
    gameOver: boolean;
}

const initialState: GameState = {
    sequence: [],
    userSequence: [],
    gameStarted: false,
    gameOver: false,
};


export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state) => {
            state.gameStarted = true;
            state.sequence = [Math.floor(Math.random() * 4)];
            state.userSequence = [];
            state.gameOver = false;
        },
        addUserInput: (state, action: PayloadAction<number>) => {
            state.userSequence.push(action.payload);
            const index = state.userSequence.length - 1;
            if (state.sequence[index] !== state.userSequence[index]) {
                state.gameOver = true;
            } else if (state.sequence.length === state.userSequence.length) {
                state.sequence.push(Math.floor(Math.random() * 4));
                state.userSequence = [];
            }
        },
        resetGame: (state) => {
            state.sequence = [];
            state.userSequence = [];
            state.gameStarted = false;
            state.gameOver = false;
        },
    },
});

export const { startGame, addUserInput, resetGame } = gameSlice.actions;
export default gameSlice.reducer;