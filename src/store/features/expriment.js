import { createSlice } from '@reduxjs/toolkit';
import { updateCurrentExperiment } from './updateExpriment';
import { redirect } from 'react-router-dom';
import { client } from '../../utils/client';
import { updateNavigateTo } from './products';
import { toastr } from 'react-redux-toastr'


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
    const { status, data: result } = await client.post("/add_experiment", {
        user_id: 1,
        experiment_id: data?.experimentId,
        experiment_name: data?.experimentName,
        product_name: data?.productName,
        group_id: data?.groupName,
        contributor_id: [1, 2, 3]
        // date
        // swatch name
    });
    if (!status)
        return toastr.error('Something went wrong, Please try again after some time')
    dispatch(closeAddModal());
    dispatch(updateCurrentExperiment({
        user_id: 1,
        experiment_id: data?.experimentId,
        experiment_name: data?.experimentName,
        product_name: data?.productName,
        group_id: data?.groupName,
        contributor_id: [1, 2, 3]
    }));
    return dispatch(updateNavigateTo(`/experiment/${result?.experiment_row_id}`))


};


