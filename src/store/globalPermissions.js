import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalPermissions: null,
};

const globalPermissionsSlice = createSlice({
  name: "globalPermissions",
  initialState,
  reducers: {
    setGLobalPermissions(state, action) {
      const globalPermissions = action.payload;
      state.globalPermissions = globalPermissions;
    },
  },
});

export const { setGLobalPermissions } = globalPermissionsSlice.actions;
export default globalPermissionsSlice.reducer;
