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
        setUserData: ({ isValid, currentUser }, { payload }) => {
            isValid = true;
            currentUser.uid = payload.uid;
            currentUser.accessToken = payload.accessToken;
            currentUser.photoURL = payload.photoURL;
            currentUser.displayName = payload.displayName;
            currentUser.email = payload.email;
        },
        clearUserData: ({ isValid, currentUser }, _action) => {
            isValid = false;
            currentUser = initialState.currentUser;
        },
    }
});

export default user;

export const { setUserData, clearUserData } = user.actions;