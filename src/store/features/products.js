import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../utils/client";

export const counterSlice = createSlice({
  name: "products",
  initialState: {
    value: 0,
    groupList: [],
    selectedGroup: null,
    totalGroup: 0,
  },
  reducers: {
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
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  updateGroupList,
  updateSelectedGroup,
  updateTotalGroupNum,
} = counterSlice.actions;

export default counterSlice.reducer;

export const incrementAsync = (amount) => (dispatch) => {
  dispatch(incrementByAmount(amount));
};

export const initializeProductPage = () => async (dispatch, getState) => {
  // const data = api call
  // lenght, status
  //   const { status, data } = await client.post("/view_by_user_id", {
  //     body: { user_id: 1 },
  //   });
  // const groupList = status ? data?.result || [];
  const groupList = [
    {
      added_by: "1",
      date_added: "Fri, 03 Nov 2023 11:04:08 GMT",
      date_modified: "Fri, 03 Nov 2023 12:02:23 GMT",
      group_id: 1,
      group_name: "Group A",
      is_deleted: false,
      modified_by: "1",
      user_id: "1",
    },
    {
      added_by: "1",
      date_added: "Mon, 06 Nov 2023 05:07:30 GMT",
      date_modified: null,
      group_id: 3,
      group_name: "Group 1",
      is_deleted: false,
      modified_by: null,
      user_id: "1",
    },
  ];
  const totalGroup = 10;

  //   console.log(data);
  dispatch(updateGroupList(groupList));
  dispatch(updateTotalGroupNum(totalGroup));
};
