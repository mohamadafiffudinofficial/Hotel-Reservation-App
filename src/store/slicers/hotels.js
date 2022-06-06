import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hotels: {
        favorites: [],
        ordered: []
    }
}

export const hotels = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        ADD_FAVORITE_HOTEL: (state, action) => {
            state.hotels.favorites.push(action.payload)
        },
        REMOVE_FAVORITE_HOTEL: (state, action) => {
            const id = action.payload.hotelId
            state.hotels.favorites = state.hotels.favorites
                .filter((hotel) => hotel.hotelId !== id)
        },
        ADD_ORDERED_HOTEL: (state, action) => {
            state.hotels.ordered.push(action.payload)
        }
    }
})

export const {
    ADD_FAVORITE_HOTEL,
    REMOVE_FAVORITE_HOTEL,
    ADD_ORDERED_HOTEL
} = hotels.actions

export default hotels.reducer