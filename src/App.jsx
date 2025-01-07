import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authSlice";
import { DispatchRedux } from "./utils/DispatchRedux";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";

import Dashboard from "./pages/Dashboard/Dashboard";
import { FilterRoutes } from "./utils/FilterRoutes";
import { use } from "react";

function App() {
  const dispatch = useDispatch();
  const [routes, setRoutes] = useState();
  const authData = useSelector((state) => state.auth);
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    if (!authData.globalRolePermissions.length) {
      const dispatchRedux = DispatchRedux(dispatch);
      if (
        dispatchRedux &&
        dispatchRedux.token &&
        dispatchRedux.globalRolePermissions &&
        dispatchRedux.user
      ) {
        setRoutes(FilterRoutes(dispatchRedux.globalRolePermissions));
      }
    } else {
      setRoutes(FilterRoutes(authData.globalRolePermissions));
    }
  }, [authData]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {routes?.map((route, i) => (
          <Route path={route.path} element={route.element} key={i} />
        ))}
      </Routes>
    </>
  );
}

export default App;
