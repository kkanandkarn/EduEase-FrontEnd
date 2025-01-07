import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { VIEW_ROLE, VIEW_ROLE_METHOD } from "../../api/endpoints";
import CheckPermission from "../../utils/CheckPermisison";
import Layout from "../../layout/Layout";
import Table from "../../components/table/Table";
import { IoArrowBack } from "react-icons/io5";

const Roles = () => {
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
    setAddPerm(CheckPermission(authData?.globalRolePermissions, "CREATE-ROLE"));
    setViewPerm(CheckPermission(authData?.globalRolePermissions, "VIEW-ROLE"));
    setEditPerm(
      CheckPermission(authData?.globalRolePermissions, "UPDATE-ROLE")
    );
    setDeletePerm(
      CheckPermission(authData?.globalRolePermissions, "DELETE-ROLE")
    );
  }, [authData]);
  const onView = (roleId) => {
    navigate(
      `${location.pathname}/view?roleId=${roleId}${
        tenantId ? `&tenantId=${tenantId}` : ""
      }`
    );
  };
  const onEdit = (roleId) => {
    navigate(
      `${location.pathname}/edit?roleId=${roleId}${
        tenantId ? `&tenantId=${tenantId}` : ""
      }`
    );
  };

  const onDelete = () => {
    console.log("Delete");
  };

  const onCLose = (isUpdate = false) => {};
  return (
    <Layout title="Roles">
      <Table
        apiEndPoint={VIEW_ROLE}
        apiMethod={VIEW_ROLE_METHOD}
        tableName={"Roles"}
        addPerm={addPerm}
        viewPerm={viewPerm}
        editPerm={editPerm}
        deletePerm={false}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        buttonText={"Add Role"}
        buttonClick={() => navigate(`/tenants/role/add?tenantId=${tenantId}`)}
        replacements={[{ tenantId: tenantId }]}
      />
    </Layout>
  );
};

export default Roles;
