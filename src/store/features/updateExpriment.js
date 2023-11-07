import { createSlice } from '@reduxjs/toolkit';
import { client } from '../../utils/client';

export const updateExperimentSlice = createSlice({
    name: 'updateExperiment',
    initialState: {
        isImageModalOpen: false,
        currentImage: null,
        currentExperiment: {}
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
        },
        updateCurrentExperiment: (state, action) => {
            state.currentExperiment = action?.payload;
        }
    }
})

export const {
    openImagePopup,
    closeImageModal,
    updateCurrentImage,
    updateCurrentExperiment
} = updateExperimentSlice.actions;

export default updateExperimentSlice.reducer;

export const initializeExperimentPage = (experiment_id) => async (dispatch, getState) => {
    const { status, data } = await client.post("/get_data_by_exp_id", {
        experiment_id
    });

    console.log("status", status, data)
    // if (status && data)
    if (data) {
        dispatch(updateCurrentExperiment(data))
    }
    const groupList = status ? data?.results : [];
    const totalGroup = data?.total_groups || 0;
}
