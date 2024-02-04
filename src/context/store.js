import { configureStore } from "@reduxjs/toolkit";
import modal from "./actions/modal";

const store = configureStore({
    reducer: {
        modal: modal.reducer,
    }
});

export default store;