import { createSlice } from '@reduxjs/toolkit';
import { client } from '../../utils/client';

export const updateExperimentSlice = createSlice({
    name: 'updateExperiment',
    initialState: {
        isImageModalOpen: false,
        currentImage: null,
        currentExperiment: {},
        isAddingNewSwatch: false,
        swatches: []
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
        },
        updateSwatches: (state, action) => {
            state.swatches = action?.payload?.length ? [...action.payload] : []
        }
    }
})

export const {
    openImagePopup,
    closeImageModal,
    updateCurrentImage,
    updateCurrentExperiment,
    updateSwatchAdd,
    updateSwatches
} = updateExperimentSlice.actions;

export default updateExperimentSlice.reducer;

export const initializeExperimentPage = (experiment_id) => async (dispatch, getState) => {
    const { status, data } = await client.post("/get_data_by_exp_id", {
        experiment_id
    });

    console.log("status", status, data)
    // if (status && data)
    if (data) {
        dispatch(updateCurrentExperiment(data?.results))
    }
    dispatch(getSwatchByExperimentId(experiment_id))
}

export const getSwatchByExperimentId = (experiment_id) => async (dispatch, getState) => {
    const { status, data } = await client.post("/get_swatch_info_by_experiment_id", {
        experiment_id
    });
    if (status && data) {
        const list = data?.results?.length ? data?.results?.map((item, i) => {
            return {
                ...item,
                priority: i + 1,
                currentPosition: i + 1
            }
        }) : []
        dispatch(updateSwatches(list))
    }
}


export const updateSwatchPosition = ({ index, newPriority }) => async (dispatch, getState) => {

    const updatedSwatches = getState()?.updateExperiment?.swatches;

    console.log("ddddddddddddd", updateSwatches)

    let existingDataIndex = updatedSwatches.findIndex(d => d.currentPosition === newPriority)
    updatedSwatches[existingDataIndex].currentPosition = updatedSwatches[index].currentPosition;
    updatedSwatches[index].currentPosition = newPriority;

    dispatch(updateSwatches(updatedSwatches));
}

export const createSwatch = (swatch_name) => async (dispatch, getState) => {
    dispatch(updateSwatchAdd(false));
    const currentData = getState()?.updateExperiment?.currentExperiment;
    console.log('ddd', currentData)
    const { status, data } = await client.post("/create_swatch", {
        swatch_name,
        user_id: 1,
        group_id: currentData?.group_id,
        experiment_id: currentData?.experiment_id
    });

    console.log("asdfasf, status,", data, status)
    dispatch(getSwatchByExperimentId(currentData?.experiment_id));
};