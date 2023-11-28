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
        currentSwatchStatus: null,
        isAddSwatchLoading: false,
        washCount: 0,
        showFinal: false,
        currentImageType: null,
        finalResult: null,
        currentStep: 1,
        isLoadingFinalResult: false
    },
    reducers: {
        openImagePopup: (state, action) => {
            state.isImageModalOpen = true
        },
        closeImageModal: (state, action) => {
            state.isImageModalOpen = false
        },
        updateCurrentImage: (state, action) => {
            state.currentImage = action.payload?.file;
            state.currentImageType = action.payload?.from;
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
            // let currentData = state.currentSwatchStatus || {}
            // state.currentSwatchStatus = {
            //     ...currentData,
            //     front_image_url: null
            // }
        },
        updateBackImage: (state, action) => {
            state.backImage = action.payload;
            // let currentData = state.currentSwatchStatus || {}
            // state.currentSwatchStatus = {
            //     ...currentData,
            //     back_image_url: null
            // }
        },
        updateSwatchList: (state, action) => {
            let currentStatus = action?.payload?.length ? action?.payload[action.payload?.length - 1] : null
            state.swatchList = action.payload;
            state.currentSwatchStatus = currentStatus;
            state.washCount = currentStatus?.wash_count || 0;
        },
        updateWashCount: (state, action) => {
            state.washCount = action.payload;
        },
        updateSwatchName: (state, action) => {
            const { swatchId, newName } = action.payload;
            const swatchToUpdate = state.swatches.find(swatch => swatch.swatch_id === swatchId);
            if (swatchToUpdate) {
                swatchToUpdate.swatch_name = newName;
            }
        },
        updateIsAddSwatchLoading: (state, action) => {
            state.isAddSwatchLoading = action.payload
        },
        showFinalStep: (state, action) => {
            state.showFinal = true
        },
        hideFinalStep: (state, action) => {
            state.showFinal = false
        },
        updateCurrentSwatchStatus: (state, action) => {
            state.currentSwatchStatus = action?.payload;
        },
        updateFinalResult: (state, action) => {
            state.finalResult = action?.payload;
        },
        updateCurrentStep: (state, action) => {
            if (action?.payload === 4) {
                state.currentStep = 4;
                return;
            }
            const currentData = state.swatchList;
            if (action?.payload == 3) {
                let data = currentData && currentData[currentData?.length - 1];
                state.currentStep = 3;
                state.currentSwatchStatus = data;
                state.washCount = data?.wash_count;
                return;
            }
            state.currentStep = action.payload;
            state.currentSwatchStatus = currentData?.find(item => item?.steps === action?.payload)
        },
        updateFinalResultLoading: (state, action) => {
            state.isLoadingFinalResult = action?.payload;
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
    updateSwatchList,
    updateWashCount,
    updateSwatchName,
    updateIsAddSwatchLoading,
    showFinalStep,
    hideFinalStep,
    updateCurrentSwatchStatus,
    updateFinalResult,
    updateCurrentStep,
    updateFinalResultLoading
} = updateExperimentSlice.actions;

export default updateExperimentSlice.reducer;

export const initializeExperimentPage =
    (experiment_id) => async (dispatch, getState) => {
        const { status, data } = await client.post("/get_data_by_exp_id", {
            id: experiment_id,
        });
        dispatch(hideFinalStep());

        if (data) {
            dispatch(updateCurrentExperiment({ ...data?.results, id: experiment_id }));
        }
        await dispatch(getSwatchByExperimentId(experiment_id));

        const firstSwatch = getState()?.updateExperiment?.swatches;
        await dispatch(updateSwatch(firstSwatch[0]))
        const swatchList = getState()?.updateExperiment?.swatchList;
        // alert("swatchList[swatchList?.length - 1]?.steps" +swatchList[+swatchList?.length - 1]?.steps)
        await dispatch(updateCurrentStep(swatchList?.[+swatchList?.length - 1]?.steps))

    }

export const updateSwatch = (swatch) => async (dispatch, getState) => {
    dispatch(updateBackImage(null));
    dispatch(updateFrontImage(null));
    dispatch(updateSwatchList(null));
    await dispatch(updateCurrentSwatch(swatch));
    const data = await dispatch(getSwatchList());
    return data;
}

export const getSwatchByExperimentId = (experiment_id) => async (dispatch, getState) => {
    const { status, data } = await client.post(
        "/get_swatch_data",
        {
            experiment_id,
        }
    );
    if (status && data) {
        const list = data?.swatch_data?.length
            ? data?.swatch_data?.map((item, i) => {
                return {
                    ...item,
                    priority: i + 1,
                    currentPosition: i + 1,
                };
            })
            : [];
        dispatch(updateSwatches(list));
    }
};

export const updateSwatchPosition =
    ({ index, newPriority }) =>
        async (dispatch, getState) => {
            const updatedSwatches = [...getState()?.updateExperiment?.swatches];

            let existingDataIndex = updatedSwatches.findIndex(
                (d) => d.currentPosition === newPriority
            );
            dispatch(updateSwatchRank({ swatch_id: updatedSwatches[index]?.swatch_id, new_rank: newPriority }))

            updatedSwatches[existingDataIndex] = {
                ...updatedSwatches[existingDataIndex],
                currentPosition: updatedSwatches[index].currentPosition,
            };
            updatedSwatches[index] = {
                ...updatedSwatches[index],
                currentPosition: newPriority,
            };

            dispatch(updateSwatches(updatedSwatches));
        };

export const createSwatch = (swatch_name) => async (dispatch, getState) => {
    dispatch(updateSwatchesLoading(true));
    dispatch(updateSwatchAdd(false));
    const currentData = getState()?.updateExperiment?.currentExperiment;
    const currentImage = getState()?.updateExperiment?.currentImage;
    const { status, data } = await client.post("/create_swatch_by_rank", {
        swatch_name,
        user_id: 1,
        group_id: currentData?.group_id,
        experiment_id: currentData?.id,
    });

    await dispatch(getSwatchByExperimentId(currentData?.id));

    const swatchLists = getState()?.updateExperiment?.swatches;
    let currentSwatch = swatchLists.find(item => item?.swatch_id == data?.swatch_id)
    await dispatch(updateSwatch(currentSwatch))
    dispatch(updateSwatchesLoading(false));
    dispatch(updateCurrentStep(1))
};

export const deleteSwatch =
    (swatchId) => async (dispatch, getState) => {
        dispatch(updateIsAddSwatchLoading(true))
        const { status, data } = await client.delete("/delete_swatch", {
            user_id: 1,
            swatch_id: swatchId,
        });
        if (status) {
            const currentData = getState()?.updateExperiment?.currentExperiment;
            await dispatch(getSwatchByExperimentId(currentData?.id));

            const firstSwatch = getState()?.updateExperiment?.swatches;
            dispatch(updateSwatch(firstSwatch[0]))
            toastr.success("Swatch deleted successfully");
        } else {
            toastr.error("Error deleting swatch");
        }
        dispatch(updateIsAddSwatchLoading(false))
    };

export const deleteSwatchImage = (image_type) => async (dispatch, getState) => {
    const currentSwatch = getState()?.updateExperiment?.currentSwatchStatus;


    const bodyFormData = new FormData();

    bodyFormData.append('user_id', 1);
    bodyFormData.append('id', currentSwatch?.id);
    bodyFormData.append('image_type', image_type);

    dispatch(updateIsAddSwatchLoading(true))
    const { status, data } = await client.delete("/delete_image_for_swatch", bodyFormData, { contentType: "multipart/form-data" });
    const list = await dispatch(getSwatchList());
    const updatedSwatch = list?.find(item => item?.id == currentSwatch?.id)
    dispatch(updateCurrentSwatchStatus(updatedSwatch))
    if (image_type === "front") {
        dispatch(updateFrontImage(null))

    } else {
        dispatch(updateBackImage(null))

    }

    dispatch(updateIsAddSwatchLoading(false))
};

export const editSwatch = ({ swatchId, swatchName }) => async (dispatch, getState) => {
    const { status, data } = await client.put("/update_swatch", {
        user_id: 1,
        swatch_id: swatchId,
        swatch_name: swatchName
    });

    if (status) {
        dispatch(updateSwatchName({ swatchId, newName: swatchName }));
    }
};

export const updateSwatchRank = ({ swatch_id, new_rank }) => async (dispatch, getState) => {
    const { status, data } = await client.put("/update_swatch_rank", {
        swatch_id,
        new_rank
    });

    if (status) {
        const currentData = getState()?.updateExperiment?.currentExperiment;
        dispatch(getSwatchByExperimentId(currentData?.id));
    }
};

const getSwatchList = () => async (dispatch, getState) => {
    const currentSwatch = getState()?.updateExperiment?.activeSwatch;
    const { status, data } = await client.post("/get_all_by_swatch_id", {
        swatch_id: currentSwatch?.swatch_id
    });
    if (status)
        dispatch(updateSwatchList((data?.results?.images || [])))

    return data?.results?.images;
}

export const addSwatchImage = ({ isSameStep }) => async (dispatch, getState) => {
    const currentSwatch = getState()?.updateExperiment?.activeSwatch;
    const currentData = getState()?.updateExperiment?.currentExperiment;
    const frontImage = getState()?.updateExperiment?.frontImage;
    const backImage = getState()?.updateExperiment?.backImage;
    const washCount = getState()?.updateExperiment?.washCount;
    const swatchList = getState()?.updateExperiment?.swatchList;

    const currentSwatchStatus = getState()?.updateExperiment?.currentSwatchStatus;

    dispatch(updateIsAddSwatchLoading(true));
    const currentStep = +(currentSwatchStatus?.steps || 1);
    if (currentStep === 1 || (currentSwatchStatus?.wash_count !== washCount)) {
        const bodyFormData = new FormData();

        bodyFormData.append('user_id', 1);
        bodyFormData.append('group_id', currentData?.group_id);
        bodyFormData.append('experiment_id', currentData?.id);
        bodyFormData.append('swatch_id', currentSwatch?.swatch_id);
        bodyFormData.append('steps', currentStep);
        bodyFormData.append('wash_count', currentStep == 3 ? washCount : 0);
        if (frontImage?.preview)
            bodyFormData.append('front_image', dataURLtoFile(frontImage?.preview, "front.jpg"));
        if (backImage?.preview)
            bodyFormData.append('back_image', dataURLtoFile(backImage?.preview, "back.jpg"));

        const { status, data, message } = await client.post("/add_image_to_swatch", bodyFormData, { contentType: "multipart/form-data" });
        if (!status)
            return toastr.error(message)
    } else if (frontImage?.preview || backImage?.preview) {
        const updateBodyFormData = new FormData();
        updateBodyFormData.append('id', currentSwatchStatus?.id);
        updateBodyFormData.append('user_id', 1);
        if (frontImage?.preview)
            updateBodyFormData.append('front_image', dataURLtoFile(frontImage?.preview, "front.jpg"));
        if (backImage?.preview)
            updateBodyFormData.append('back_image', dataURLtoFile(backImage?.preview, "back.jpg"));
        const { status, data, message } = await client.put("/update_swatch_image", updateBodyFormData, { contentType: "multipart/form-data" });
        if (!status)
            return toastr.error(message)

    }
    if (!isSameStep && ((currentSwatchStatus?.steps || 1) == 3)) {

        dispatch(updateIsAddSwatchLoading(false))

        const swatches = getState()?.updateExperiment?.swatches;
        let current = swatches.find(item => item?.swatch_id == currentSwatch?.swatch_id)
        dispatch(updateSwatch(current))
        return dispatch(updateCurrentStep(4))
    }
    if (!isSameStep && ((currentSwatchStatus?.steps || 1) < 3)) {
        let newStep = (currentSwatchStatus?.steps || 1) + 1;
        let isExist = !!swatchList?.find(item => item?.steps === newStep)
        if (swatchList && isExist) {

            dispatch(updateIsAddSwatchLoading(false))
            dispatch(updateCurrentStep(newStep))
            return;
        } else {

            const bodyFormData = new FormData();
            let currentStep = (currentSwatchStatus?.steps || 1) + 1;
            bodyFormData.append('user_id', 1);
            bodyFormData.append('group_id', currentData?.group_id);
            bodyFormData.append('experiment_id', currentData?.id);
            bodyFormData.append('swatch_id', currentSwatch?.swatch_id);
            bodyFormData.append('steps', currentStep);
            bodyFormData.append('wash_count', (currentStep) == 3 ? 1 : 0);

            const { status, data, message } = await client.post("/add_image_to_swatch", bodyFormData, { contentType: "multipart/form-data" });
            if (!status)
                return toastr.error(message)
        }

    }
    {
        const currentData = getState()?.updateExperiment?.currentExperiment;
        await dispatch(getSwatchByExperimentId(currentData?.id));

        const swatches = getState()?.updateExperiment?.swatches;
        let current = swatches.find(item => item?.swatch_id == currentSwatch?.swatch_id)
        await dispatch(updateSwatch(current));
        if (!isSameStep)
            await dispatch(updateCurrentStep((currentSwatchStatus?.steps || 1) + 1))
    }


    // if (isSameStep && ((currentSwatchStatus?.steps || 1) == 3)) {
    // dispatch(updateBackImage(null));
    // dispatch(updateFrontImage(null));

    // const currentSwatch = getState()?.updateExperiment?.currentSwatchStatus;
    // dispatch(updateCurrentSwatchStatus({
    //     ...currentSwatch,
    //     front_image_url: null,
    //     back_image_url: null
    // }))

    // }
    dispatch(updateIsAddSwatchLoading(false))
};

export const getFinalResult = () => async (dispatch, getState) => {
    const currentData = getState()?.updateExperiment?.currentExperiment;
    dispatch(updateFinalResultLoading(true));
    const { status, data } = await client.post("/final_results_by_exp_id", {
        eid: currentData?.id
    });
    dispatch(updateFinalResultLoading(false));
    if (status)
        dispatch(updateFinalResult((data?.result)))
}