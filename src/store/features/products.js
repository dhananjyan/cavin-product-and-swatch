import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../utils/client";

export const counterSlice = createSlice({
  name: "products",
  initialState: {
    value: 0,
    groupList: [],
    selectedGroup: null,
    totalGroup: 0,
    isAddGroup: false,
    experimentData: [],
    contributorsData: [],
    isExperimentLoading: false
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    updateGroupList: (state, action) => {
      state.groupList = action.payload;
    },
    updateTotalGroupNum: (state, action) => {
      state.totalGroup = action.payload;
    },
    updateSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    updateAddGroupPopupStatus: (state, action) => {
      state.isAddGroup = action.payload;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    updateGroupList: (state, action) => {
      state.groupList = action.payload;
    },
    updateTotalGroupNum: (state, action) => {
      state.totalGroup = action.payload;
    },
    updateSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    updateAddGroupPopupStatus: (state, action) => {
      state.isAddGroup = action.payload;
    },
    updateExperimentData: (state, action) => {
      state.experimentData = action.payload;
    },
    updateContributorsData: (state, action) => {
      state.contributorsData = action.payload;
    },
    updateExperimentLoading: (state, action) => {
      state.isExperimentLoading = action.payload;
    },

  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  updateGroupList,
  updateSelectedGroup,
  updateTotalGroupNum,
  updateAddGroupPopupStatus,
  updateExperimentData,
  updateContributorsData,
  updateExperimentLoading
} = counterSlice.actions;

export default counterSlice.reducer;

export const incrementAsync = (amount) => (dispatch) => {
  dispatch(incrementByAmount(amount));
};

export const getGroupData = () => async (dispatch, getState) => {
  const { status, data } = await client.post("/view_group_by_user_id", {
    user_id: 1,
  });
  const groupList = status ? data?.results : [];
  const totalGroup = data?.total_groups || 0;

  dispatch(updateGroupList(groupList));
  dispatch(updateTotalGroupNum(totalGroup));
};

export const initializeProductPage = () => async (dispatch, getState) => {
  await dispatch(getGroupData());
  const state = getState();
  const fristGroupId = state?.products?.groupList?.[0]?.group_id;
  dispatch(getExperimentsByGroupId(fristGroupId));
};

export const getExperimentsByGroupId =
  (groupId) => async (dispatch, getState) => {
    dispatch(updateExperimentLoading(true))
    dispatch(updateSelectedGroup(groupId));
    const { status, data } = await client.post("/get_experiments_by_group_id", {
      group_id: groupId,
      user_id: 1
    });

    dispatch(updateExperimentLoading(false))

    const experimentData = status ? data.results : [];
    dispatch(updateExperimentData(experimentData));
  };

export const createGroup = (group_name) => async (dispatch, getState) => {
  dispatch(updateAddGroupPopupStatus(false));
  const { status, data } = await client.post("/add_group", {
    group_name,
    user_id: 1,
  });
  dispatch(getGroupData());
};
export const getContributorsList = () => async (dispatch, getState) => {
  const { status, data } = await client.post("/get_contributors");
  const contributorsData = status ? data.results : [];
  dispatch(updateContributorsData(contributorsData));
};
