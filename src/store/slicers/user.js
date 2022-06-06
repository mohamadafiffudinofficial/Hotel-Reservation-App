import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        phone: ''
    },
    isAuthenticated: false
}

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SET_USER: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        },
        SET_AUTHENTICATED: (state, action) => {
            state.isAuthenticated = action.payload
        },
    }
})

export const {
    SET_USER,
    SET_AUTHENTICATED
} = user.actions

export default user.reducer