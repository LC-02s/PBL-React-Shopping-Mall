import { configureStore } from "@reduxjs/toolkit";
import modal from "./actions/modal";
import user from "./actions/user";
import product from "./actions/product";
import cart from "./actions/cart";

const store = configureStore({
    reducer: {
        modal: modal.reducer,
        user: user.reducer,
        product: product.reducer,
        cart: cart.reducer,
    }
});

export default store;