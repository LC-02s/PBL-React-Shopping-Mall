import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {},
    length: 0,
    products: {
        list: [],
        total: 0,
    },
};

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: ({ items }, { payload }) => {
            items[payload] = items[payload] ? items[payload] += 1 : 1;
        },
        minusCartItem: ({ items }, { payload }) => {
            if (items[payload] <= 1) delete items[payload];
            else items[payload] -= 1;
        },
        deleteCartItem: ({ items }, { payload }) => {
            delete items[payload];
        },
        clearCart: ({ items }, _action) => {
            items = initialState.items;
        },
        setTotalPrice: ({ total }, { payload }) => {
            total = payload ?? 0;
        },
    },
});

export default cart;

export const { addCartItem, minusCartItem, deleteCartItem, clearCart, setTotalPrice } = cart.actions;