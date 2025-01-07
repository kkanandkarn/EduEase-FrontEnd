import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sidebarReducer from "./sidebarSlice";
import globalPermissionsReducer from "./globalPermissions";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    globalPermissions: globalPermissionsReducer,
  },
});

export default store;
