import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: null,
    userName: "",
    userEmail: "",
    userContact: "",
    userAddress: "",
    roleId: null,
    role: "",
    status: "",
  },
  tenant: {
    tenantId: null,
    tenantName: "",
    tenantEmail: "",
    tenantContact: "",
    tenantAddress: "",
    tenantLogo: {
      fileUrl: "",
      fileName: "",
    },
  },
  token: "",
  globalRolePermissions: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, tenant, token, globalRolePermissions } = action.payload;
      state.user = user;
      state.tenant = tenant;
      state.token = token;
      state.globalRolePermissions = globalRolePermissions;
    },

    logout(state) {
      state.user = {
        userId: null,
        userName: "",
        userEmail: "",
        userContact: "",
        userAddress: "",
        roleId: null,
        role: "",
        status: "",
      };
      state.tenant = {
        tenantId: null,
        tenantName: "",
        tenantEmail: "",
        tenantContact: "",
        tenantAddress: "",
        tenantLogo: {
          fileUrl: "",
          fileName: "",
        },
      };
      state.token = "";
      state.globalRolePermissions = [];
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
