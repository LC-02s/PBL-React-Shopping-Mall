import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct, cartItemFilter, calcTotalPrice, sortCartItem } from "../../apis/product";

const initialState = {
    // id: { length:<Number>, index:<Number> }
    items: {},
    itemLength: 0,
    products: {
        status: 'pending',
        data: [],
        errCode: null,
    },
    totalPrice: 0,
};

export const getProductsToCart = createAsyncThunk(
    'cart/getProductsToCart',
    async () => {
        const { data } = await getProduct.get('', { params: { sort: 'desc' } });
        return data;
    }
);

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, { payload }) => {
            const { items, itemLength } = state;
            state.items[payload] = {
                length: items[payload]?.length + 1 || 1,
                index: itemLength,
            }
            state.itemLength = Object.keys(items).length;
        },
        plusCartItem: (state, { payload }) => {
            state.items[payload.id].length += 1;
            state.products.data[payload.idx].length += 1;
            state.totalPrice = calcTotalPrice(state.products.data);
        },
        minusCartItem: (state, { payload }) => {
            const { items, products } = state;
            if (items[payload.id].length === 1) {
                delete state.items[payload.id];
                state.items = sortCartItem(state.items);
                state.products.data = cartItemFilter(products.data, state.items);
                state.itemLength -= 1;
            } else {
                state.items[payload.id].length -= 1;
                state.products.data[payload.idx].length -= 1;
            }
            state.totalPrice = calcTotalPrice(state.products.data);
        },
        removeCartItem: (state, { payload }) => {
            const { items, products } = state;
            delete state.items[payload.id];
            state.products.data = cartItemFilter(products.data, items);
            state.itemLength -= 1;
            state.totalPrice = calcTotalPrice(state.products.data);
        },
    },
    extraReducers: (bulider) => {
        bulider
            .addCase(getProductsToCart.pending, (state) => {
                state.products.status = 'pending';
            })
            .addCase(getProductsToCart.fulfilled, (state, { payload }) => {
                const { items } = state;
                const filteredProducts = cartItemFilter(payload, items);
                state.products.data = filteredProducts;
                state.totalPrice = calcTotalPrice(filteredProducts);
                state.products.status = 'fulfilled';
            })
            .addCase(getProductsToCart.rejected, (state) => {
                state.products.status = 'rejected';
                state.products.data = [];
            })
    },
});

export default cart;

export const { addCartItem, plusCartItem, minusCartItem, removeCartItem } = cart.actions;