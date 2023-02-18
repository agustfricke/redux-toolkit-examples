import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // sumar 
        increment: (state) => {
            state.count += 1
        },
        //restar
        decrement: (state) => {
            state.count -= 1
        },
    }
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;

