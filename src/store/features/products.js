import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../utils/client";

export const counterSlice = createSlice({
  name: "products",
  initialState: {
    value: 0,
    groupList: [],
    selectedGroup: null,
    selectedGroupName: "",
    totalGroup: 0,
    isAddGroup: false,
    experimentData: [],
    contributorsData: [],
    isExperimentLoading: false,
    isGroupDataLoading: false,
    redirectTo: null,
    isEditContributor: false,
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
    updateSelectedGroupName: (state, action) => {
      state.selectedGroupName = action.payload;
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
    updateGroupLoading: (state, action) => {
      state.isGroupDataLoading = action.payload;
    },
    updateNavigateTo: (state, action) => {
      state.redirectTo = action.payload;
    },
    updateOpenEdit: (state) => {
      state.isEditContributor = true
    },
    updateCloseEdit: (state) => {
      state.isEditContributor = false
    }
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  updateGroupList,
  updateSelectedGroup,
  updateSelectedGroupName,
  updateTotalGroupNum,
  updateAddGroupPopupStatus,
  updateExperimentData,
  updateContributorsData,
  updateExperimentLoading,
  updateGroupLoading,
  updateNavigateTo,
  updateOpenEdit,
  updateCloseEdit,
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
  const groupName = state?.products?.groupList?.[0]?.group_name;
  dispatch(getExperimentsByGroupId(fristGroupId));
  dispatch(updateSelectedGroupName(groupName))
};

export const getExperimentsByGroupId =
  (groupId) => async (dispatch, getState) => {
    dispatch(updateExperimentLoading(true));
    dispatch(updateSelectedGroup(groupId));
    const { status, data } = await client.post("/get_experiments_by_group_id", {
      group_id: groupId,
      user_id: 1,
    });
    const experimentData = status ? data.results : [];
    await dispatch(updateExperimentData(experimentData));
    dispatch(updateExperimentLoading(false));
  };

export const deleteExpirement = (expId) => async (dispatch, getState) => {
  const { status, data } = await client.delete("/delete_experiment", {
    user_id: 1,
    id: expId,
  });
  // dispatch(updateExperimentLoading(true));
  if (status) {
    const currentGroup = getState()?.products?.selectedGroup;
    console.log(currentGroup, "currentGroup");
    dispatch(getExperimentsByGroupId(currentGroup));
    dispatch(updateExperimentLoading(false));
    toastr.success("Experiment deleted successfully");
  } else {
    toastr.error("Error deleting experiment");
  }
};

export const createGroup = (group_name) => async (dispatch, getState) => {
  dispatch(updateGroupLoading(true));
  dispatch(updateAddGroupPopupStatus(false));
  const { status, data } = await client.post("/add_group", {
    group_name,
    user_id: 1,
  });
  await dispatch(getGroupData());
  dispatch(updateGroupLoading(false));
};

export const getContributorsList = () => async (dispatch, getState) => {
  const { status, data } = await client.post("/get_contributors");
  const contributorsData = status ? data.results : [];
  dispatch(updateContributorsData(contributorsData));
};

export const deleteContributor = (conId) => async (dispatch, getState) => {
  const { status, data } = await client.delete("/delete_contributors", {
    contributor_id: conId,
    user_id: 1
  })
  if (status) {
    dispatch(getContributorsList());
  }
};

export const editContributor = (contData) => async (dispatch, getState) => {
  const { status, data } = await client.post("/update_contributors", {
    user_id: 1,
    contributor_id: contData.contributor_id,
    contributor_name: contData.contributor_name,
    email_id: contData.email_id
  })
  if (status) {
    dispatch(getContributorsList());
  }
}