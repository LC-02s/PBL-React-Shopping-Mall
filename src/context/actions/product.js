import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryToListView: null,
}

const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        changeCategory: (state, { payload }) => {
            state.categoryToListView = payload ?? null;
        },
    }
});

export default product;

export const { changeCategory } = product.actions;