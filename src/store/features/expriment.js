import { createSlice } from '@reduxjs/toolkit';

export const experimentSlice = createSlice({
    name: 'experiment',
    initialState: {
        isModalOpen: false,
        currentExperiment: {}
    },
    reducers: {
        openAddPopup: (state) => {
            state.isModalOpen = true;
        },
        closeAddModal: (state) => {
            state.isModalOpen = false;
        },
        updateCurrentExperiment: (state, action) => {
            state.currentExperiment = action?.payload;
        }
    }
})

export const {
    openAddPopup,
    closeAddModal
} = experimentSlice.actions;


export default experimentSlice.reducer;


export const createExpriment = (data) => async (dispatch, getState) => {
    const { status, data } = await client.post("/add_experiment", {
        user_id: 1,
        experiment_id: data?.experimentId,
        experiment_name: data?.experimentName,
        product_name: data?.productName,
        group_id: data?.groupName,
        contributor_id: [1, 2, 3]
        // date
        // swatch name
    });
    dispatch(getGroupData());
};

