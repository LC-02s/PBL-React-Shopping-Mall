import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    isValid: false,
    currentUser: {
        uid: '',
        photoURL: '',
        displayName: '',
    }
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: ({ isValid, currentUser }, { payload }) => {
            isValid = true;
            currentUser.uid = payload.uid;
            currentUser.photoURL = payload.photoURL;
            currentUser.displayName = payload.displayName;
        },
        clearUserData: ({ isValid, currentUser }, _action) => {
            isValid = false;
            currentUser = initialState.currentUser;
        },
    }
});

export default user;

export const { setUserData, clearUserData } = user.actions;