import { createSlice } from '@reduxjs/toolkit';

export const exprimentSlice = createSlice({
    name: 'expriment',
    initialState: {
        isModalOpen: false
    },
    reducers: {
        openAddPopup: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isModalOpen = true
        },
        closeAddModal: (state, action) => {
            state.isModalOpen = false
        }
    }
})

export const {
    openAddPopup,
    closeAddModal
} = exprimentSlice.actions;


export default exprimentSlice.reducer;

