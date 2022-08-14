import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    getUserData: (state, action) => {
      console.log(action);
      state.userData = action.payload;
    }
  }
});

export const { getUserData } = rootSlice.actions;

export default rootSlice.reducer;
