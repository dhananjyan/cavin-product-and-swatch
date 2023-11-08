import { createSlice } from '@reduxjs/toolkit';
import { client } from '../../utils/client';

export const updateExperimentSlice = createSlice({
    name: 'updateExperiment',
    initialState: {
        isImageModalOpen: false,
        currentImage: null,
        currentExperiment: {},
        isAddingNewSwatch: false
    },
    reducers: {
        openImagePopup: (state, action) => {
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
        },
        updateSwatchAdd: (state, action) => {
            state.isAddingNewSwatch = action?.payload
        }
    }
})

export const {
    openImagePopup,
    closeImageModal,
    updateCurrentImage,
    updateCurrentExperiment,
    updateSwatchAdd
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
    // const groupList = status ? data?.results : [];
    // const totalGroup = data?.total_groups || 0;
}


export const createSwatch = (swatch_name) => async (dispatch, getState) => {
    dispatch(updateSwatchAdd(false));
    const currentData = getState()?.updateExperiment?.currentExperiment;
    console.log('ddd', currentData)
    const { status, data } = await client.post("/create_swatch", {
        swatch_name,
        user_id: 1,
        steps: 1,
        group_id: currentData?.group_id,
        experiment_id: currentData?.experiment_id
    });
    dispatch(getGroupData());
};