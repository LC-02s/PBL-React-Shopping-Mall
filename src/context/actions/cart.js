import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct, cartItemFilter, calcTotalPrice } from "../../apis/product";

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
        addCartItem: ({ items, itemLength, products, totalPrice }, { payload }) => {
            const updatedItems = { ...items };
            updatedItems[payload] = {
                length: updatedItems[payload]?.length + 1 || 1,
                index: itemLength - 1,
            }
            return {
                items: updatedItems,
                itemLength: Object.keys(updatedItems).length,
                products, 
                totalPrice,
            }
        },
        plusCartItem: ({ items, products }, { payload }) => {
            items[payload.id].length += 1;
            products.data[payload.idx].length += 1;
        },
        minusCartItem: ({ items, itemLength, products, totalPrice }, { payload }) => {
            if (items[payload.id].length === 1) {
                const updatedItems = { ...items };
                const updatedProducts = { ...products };
                
                delete updatedItems[payload.id];
                updatedProducts.data = cartItemFilter(updatedProducts.data, updatedItems);
                itemLength -= 1;

                return ({ items: updatedItems, itemLength, products: updatedProducts, totalPrice });
            } else {
                items[payload.id].length -= 1;
                products.data[payload.idx].length -= 1;
            }
        },
        removeCartItem: ({ items, itemLength, products, totalPrice }, { payload }) => {
            const updatedItems = { ...items };
            const updatedProducts = { ...products };
            
            delete updatedItems[payload.id];
            updatedProducts.data = cartItemFilter(updatedProducts.data, updatedItems);
            itemLength -= 1;

            return ({ items: updatedItems, itemLength, products: updatedProducts, totalPrice });
        },
    },
    extraReducers: (bulider) => {
        bulider
            .addCase(getProductsToCart.pending, ({ products }) => {
                products.status = 'pending';
            })
            .addCase(getProductsToCart.fulfilled, ({ items, products }, { payload }) => {
                const filteredProducts = cartItemFilter(payload, items);
                products.data = filteredProducts;
                products.totalPrice = calcTotalPrice(filteredProducts);
                products.status = 'fulfilled';
            })
            .addCase(getProductsToCart.rejected, ({ products }) => {
                products.status = 'rejected';
                products.data = [];
            })
    },
});

export default cart;

export const { addCartItem, plusCartItem, minusCartItem, removeCartItem } = cart.actions;