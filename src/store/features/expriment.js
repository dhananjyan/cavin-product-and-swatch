import { createSlice } from '@reduxjs/toolkit';
import { updateCurrentExperiment } from './updateExpriment';
import { Router } from 'react-router-dom';

export const experimentSlice = createSlice({
    name: 'experiment',
    initialState: {
        isModalOpen: false
    },
    reducers: {
        openAddPopup: (state) => {
            state.isModalOpen = true;
        },
        closeAddModal: (state) => {
            state.isModalOpen = false;
        }
    }
})

export const {
    openAddPopup,
    closeAddModal
} = experimentSlice.actions;


export default experimentSlice.reducer;


export const createExperiment = (data) => async (dispatch, getState) => {
    // const { status, data } = await client.post("/add_experiment", {
    //     user_id: 1,
    //     experiment_id: data?.experimentId,
    //     experiment_name: data?.experimentName,
    //     product_name: data?.productName,
    //     group_id: data?.groupName,
    //     contributor_id: [1, 2, 3]
    //     // date
    //     // swatch name
    // });
    dispatch(updateCurrentExperiment(data));
    Router.push("/asdf")
};


