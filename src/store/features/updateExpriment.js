import { createSlice } from '@reduxjs/toolkit';
import { client } from '../../utils/client';
import { dataURLtoFile } from '../../helpers/convertFileToBase64';
import { toastr } from 'react-redux-toastr';

export const updateExperimentSlice = createSlice({
    name: 'updateExperiment',
    initialState: {
        isImageModalOpen: false,
        currentImage: null,
        currentExperiment: {},
        isAddingNewSwatch: false,
        swatches: [],
        isSwatchesLoading: false,
        activeSwatch: null,
        frontImage: null,
        backImage: null,
        swatchList: [],
        currentSwatchStatus: null
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
            state.swatches = action?.payload?.length ? [...action.payload] : [];
        },
        updateSwatchesLoading: (state, action) => {
            state.isSwatchesLoading = action.payload;
        },
        updateCurrentSwatch: (state, action) => {
            state.activeSwatch = action.payload;
        },
        updateFrontImage: (state, action) => {
            state.frontImage = action.payload;
        },
        updateBackImage: (state, action) => {
            state.backImage = action.payload;
        },
        updateSwatchList: (state, action) => {
            state.swatchList = action.payload;
            state.currentSwatchStatus = action?.payload[action.payload?.length - 1]
        }
    }
})

export const {
    openImagePopup,
    closeImageModal,
    updateCurrentImage,
    updateCurrentExperiment,
    updateSwatchAdd,
    updateSwatches,
    updateSwatchesLoading,
    updateCurrentSwatch,
    updateFrontImage,
    updateBackImage,
    updateSwatchList
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
    await dispatch(getSwatchByExperimentId(experiment_id));

    const firstSwatch = getState()?.updateExperiment?.swatches;
    console.log("firstSwatch[firstSwatch?.length - 1]", firstSwatch[firstSwatch?.length - 1], firstSwatch)
    dispatch(updateSwatch(firstSwatch[0]))

}

export const updateSwatch = (swatch) => async (dispatch, getState) => {
    await dispatch(updateCurrentSwatch(swatch));
    dispatch(getSwatchList())
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

    const updatedSwatches = [...getState()?.updateExperiment?.swatches];

    let existingDataIndex = updatedSwatches.findIndex(d => d.currentPosition === newPriority)
    updatedSwatches[existingDataIndex] = {
        ...updatedSwatches[existingDataIndex],
        currentPosition: updatedSwatches[index].currentPosition
    }
    updatedSwatches[index] = {
        ...updatedSwatches[index],
        currentPosition: newPriority
    }

    dispatch(updateSwatches(updatedSwatches));
}

export const createSwatch = (swatch_name) => async (dispatch, getState) => {
    dispatch(updateSwatchesLoading(true));
    dispatch(updateSwatchAdd(false));
    const currentData = getState()?.updateExperiment?.currentExperiment;
    const { status, data } = await client.post("/create_swatch", {
        swatch_name,
        user_id: 1,
        group_id: currentData?.group_id,
        experiment_id: currentData?.experiment_id
    });

    dispatch(getSwatchByExperimentId(currentData?.experiment_id));
    dispatch(updateSwatchesLoading(false));
};

const getSwatchList = () => async (dispatch, getState) => {
    const currentSwatch = getState()?.updateExperiment?.activeSwatch;
    const { status, data } = await client.post("/get_all_by_swatch_id", {
        swatch_id: currentSwatch?.swatch_id
    });
    if (status)
        dispatch(updateSwatchList((data?.results?.images)))
}

export const addSwatchImage = () => async (dispatch, getState) => {
    const currentSwatch = getState()?.updateExperiment?.activeSwatch;
    const currentData = getState()?.updateExperiment?.currentExperiment;
    const frontImage = getState()?.updateExperiment?.frontImage;
    const backImage = getState()?.updateExperiment?.backImage;

    const bodyFormData = new FormData();

    bodyFormData.append('user_id', 1);
    bodyFormData.append('group_id', currentData?.group_id);
    bodyFormData.append('experiment_id', currentData?.experiment_id);
    bodyFormData.append('swatch_id', currentSwatch?.swatch_id);
    bodyFormData.append('steps', 1);
    bodyFormData.append('wash_count', 0);
    bodyFormData.append('front_image', dataURLtoFile(frontImage?.preview, frontImage?.name));
    bodyFormData.append('back_image', dataURLtoFile(backImage?.preview, backImage?.name));

    const { status, data, message } = await client.post("/add_image_to_swatch", bodyFormData, { contentType: "multipart/form-data" });

    if (status) {
        dispatch(getSwatchList())
    } else {
        toastr.error(message)
    }

};