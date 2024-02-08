import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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
        addCartItem: ({ items, itemLength, products, totalPrice }, { payload }) => {
            // items[payload] = {
            //     length: items[payload]?.length + 1 || 1,
            //     index: itemLength - 1,
            // }
            // itemLength = Object.keys(items).length;
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
        plusCartItem: ({ items, products, totalPrice }, { payload }) => {
            items[payload.id].length += 1;
            products.data[payload.idx].length += 1;
            totalPrice += products.data[payload.idx].price;
            console.log(products.data[payload.idx].price);
        },
        minusCartItem: ({ items, itemLength, products, totalPrice }, { payload }) => {
            totalPrice -= Number(products.data[payload.idx].price.toFixed(2));
            if (items[payload.id].length === 1) {
                delete items[payload.id];
                items = sortCartItem(items);
                delete products.data[payload.idx];
                itemLength -= 1;
            } else {
                items[payload.id].length -= 1;
                products.data[payload.idx].length -= 1;
            }
        },
        removeCartItem: ({ items, itemLength, products, totalPrice }, { payload }) => {
            delete items[payload.id];
            products.data = cartItemFilter(products.data, items);
            itemLength -= 1;
            totalPrice = calcTotalPrice(products.data);
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