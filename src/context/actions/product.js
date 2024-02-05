import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}

const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addCartItem: ({ cart }, { payload }) => {
            
        },
        deleteCartItem: ({ cart }, { payload }) => {
            
        },
        clearCartItem: ({ cart }, _action) => {
            cart = initialState.cart;
        },
    }
});

export default product;

export const { addCartItem, deleteCartItem, clearCartItem } = product.actions;