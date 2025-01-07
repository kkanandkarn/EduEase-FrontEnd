import React from "react";
import Layout from "../../layout/Layout";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const authData = useSelector((state) => state.auth);
  return <Layout title="Dashboard">{authData.tenant.tenantName}</Layout>;
};

export default Dashboard;
