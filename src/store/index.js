import { configureStore } from '@reduxjs/toolkit'
import hotels from './slicers/hotels'
import user from './slicers/user'

export const store = configureStore({
    reducer: {
        hotels,
        user
    },
})