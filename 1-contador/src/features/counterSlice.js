import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        sumar: (state) => {
            state.count += 1
        },
        restar: (state) => {
           state.count -= 1 
        },
        reset: (state) => {
            state.count = 0;
        },
        incrementarPorNumero: (state,action) => {
            state.count += action.payload
        }
    }
})
export const { sumar, restar, reset, incrementarPorNumero } = counterSlice.actions;
export default counterSlice.reducer;
