import { createSlice } from "@reduxjs/toolkit";

const modal = createSlice({
    name: 'modal',
    initialState: { 
        isVisible: false,
        component: '',
        arrowDimmedClickToClose: true,
    },
    reducers: {
        modalOn: (state, { payload }) => {
            state.isVisible = true;
            state.component = payload.component;
            state.arrowDimmedClickToClose = payload.arrowDimmedClickToClose ?? true;
        },
        modalOff: (state, _action) => {
            state.isVisible = false;
        },
    }
});

export default modal;

export const { modalOn, modalOff } = modal.actions;