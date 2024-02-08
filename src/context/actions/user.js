import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    isValid: false,
    currentUser: {
        uid: '',
        accessToken: '',
        photoURL: '',
        displayName: '',
        email: '',
    }
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, { payload }) => {
            state.isValid = true;
            state.currentUser.uid = payload.uid;
            state.currentUser.accessToken = payload.accessToken;
            state.currentUser.photoURL = payload.photoURL;
            state.currentUser.displayName = payload.displayName;
            state.currentUser.email = payload.email;
        },
        clearUserData: (state, _action) => {
            state.isValid = false;
            state.currentUser = initialState.currentUser;
        },
    }
});

export default user;

export const { setUserData, clearUserData } = user.actions;