import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminOneExist: false,
  adminOne: {},
};

const adminOneSlice = createSlice({
  name: "adminOne",
  initialState,
  reducers: {
    saveAdminOne: (state, action) => {
      state.isAdminOneExist = true;
      state.adminOne = action.payload;
    },

    clearAdminOne: (state) => {
      state.isAdminOneExist = false;
      state.adminOne = {};
    },
  },
});
export const { saveAdminOne, clearAdminOne } = adminOneSlice.actions;

export default adminOneSlice.reducer;
