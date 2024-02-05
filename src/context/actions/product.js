import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {
        categoryToListView: false,
    },
    cart: [],
}

const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        changeCategory: ({ product }, { payload }) => {
            product.categoryToListView = payload?.categoryToListView ?? false;
        },
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

export const { 
    changeCategory,
    addCartItem, 
    deleteCartItem, 
    clearCartItem 
} = product.actions;