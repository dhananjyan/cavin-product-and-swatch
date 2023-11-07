import { createSlice } from '@reduxjs/toolkit';

export const updateExprimentSlice = createSlice({
    name: 'updateExperiment',
    initialState: {
        isImageModalOpen: false,
        currentImage: null
    },
    reducers: {
        openImagePopup: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isImageModalOpen = true
        },
        closeImageModal: (state, action) => {
            state.isImageModalOpen = false
        },
        updateCurrentImage: (state, action) => {
            state.currentImage = action.payload
        }
    }
})

export const {
    openImagePopup,
    closeImageModal,
    updateCurrentImage
} = updateExprimentSlice.actions;


export default updateExprimentSlice.reducer;

