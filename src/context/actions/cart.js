import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
}

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, { payload }) => {
            
        },
        deleteCartItem: (state, { payload }) => {
            
        },
        clearCartItem: (state, _action) => {
            state = initialState;
        },
    }
});

export default cart;

export const { addCartItem, deleteCartItem, clearCartItem } = cart.actions;