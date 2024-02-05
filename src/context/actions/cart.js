import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, { payload }) => {
            state[payload] = state[payload] ? state[payload] += 1 : 1;
        },
        minusCartItem: (state, { payload }) => {
            if (state.payload === 0) state.payload = 0;
            else state.payload -= 1;
        },
        deleteCartItem: (state, { payload }) => {
            state[payload] = 0;
        },
        clearCartItem: (state, _action) => {
            state = initialState;
        },
    }
});

export default cart;

export const { addCartItem, minusCartItem, deleteCartItem, clearCartItem } = cart.actions;