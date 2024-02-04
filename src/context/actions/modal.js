import { createSlice } from "@reduxjs/toolkit";

const modal = createSlice({
    name: 'modal',
    initialState: { 
        isVisible: false,
        Component: null,
        interaction: '',
        useDimmedClick: true,
        useCloseBtn: false,
    },
    reducers: {
        modalOn: (state, action) => {
            state.isVisible = true;
            state.Component = action.Component;
            state.interaction = action.interaction;
            state.useDimmedClick = action?.useDimmedClick ?? true;
            state.useCloseBtn = action?.useCloseBtn ?? false;
        },
        modalOff: (state, _action) => {
            state.isVisible = false;
        },
    }
});

export default modal;

export const { modalOn, modalOff } = modal.actions;