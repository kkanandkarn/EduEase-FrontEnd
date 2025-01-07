import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { VIEW_USER, VIEW_USER_METHOD } from "../../api/endpoints";
import Layout from "../../layout/Layout";
import { useSelector } from "react-redux";
import Table from "../../components/table/Table";
import CheckPermission from "../../utils/CheckPermisison";

const Users = () => {
  const [addPerm, setAddPerm] = useState(false);
  const [viewPerm, setViewPerm] = useState(false);
  const [editPerm, setEditPerm] = useState(false);
  const [deletePerm, setDeletePerm] = useState(false);
  const [searchParams] = useSearchParams();
  const tenantId = searchParams.get("tenantId");
  const location = useLocation();
  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth);
  useEffect(() => {
    setAddPerm(CheckPermission(authData?.globalRolePermissions, "ADD-USER"));
    setViewPerm(CheckPermission(authData?.globalRolePermissions, "VIEW-USER"));
    setEditPerm(
      CheckPermission(authData?.globalRolePermissions, "UPDATE-USER")
    );
    setDeletePerm(
      CheckPermission(authData?.globalRolePermissions, "DELETE-USER")
    );
  }, [authData]);
  const onView = (userId) => {
    navigate(
      `${location.pathname}/view?userId=${userId}${
        tenantId ? `&tenantId=${tenantId}` : ""
      }`
    );
  };
  const onEdit = (userId) => {
    navigate(
      `${location.pathname}/edit?userId=${userId}${
        tenantId ? `&tenantId=${tenantId}` : ""
      }`
    );
  };

  const onDelete = () => {
    console.log("Delete");
  };

  const onCLose = (isUpdate = false) => {};
  return (
    <Layout title="Users">
      <Table
        apiEndPoint={VIEW_USER}
        apiMethod={VIEW_USER_METHOD}
        tableName={"Users"}
        addPerm={addPerm}
        viewPerm={viewPerm}
        editPerm={editPerm}
        deletePerm={false}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        buttonText={"Add User"}
        buttonClick={() => navigate(`/tenants/user/add?tenantId=${tenantId}`)}
        replacements={[{ tenantId: tenantId }]}
      />
    </Layout>
  );
};

export default Users;
