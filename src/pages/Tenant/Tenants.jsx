import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useSelector } from "react-redux";
import CheckPermission from "../../utils/CheckPermisison";
import Table from "../../components/table/Table";
import { VIEW_TENANTS, VIEW_TENANTS_METHOD } from "../../api/endpoints";
import AddTenantModal from "../../components/Models/Tenant/AddTenantModal";
import { useNavigate } from "react-router-dom";

const Tenants = () => {
  const [addPerm, setAddPerm] = useState(false);
  const [viewPerm, setViewPerm] = useState(false);
  const [editPerm, setEditPerm] = useState(false);
  const [deletePerm, setDeletePerm] = useState(false);

  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth);

  useEffect(() => {
    setAddPerm(
      CheckPermission(authData?.globalRolePermissions, "CREATE-TENANT")
    );
    setViewPerm(
      CheckPermission(authData?.globalRolePermissions, "VIEW-TENANT")
    );
    setEditPerm(
      CheckPermission(authData?.globalRolePermissions, "UPDATE-TENANT")
    );
    setDeletePerm(
      CheckPermission(authData?.globalRolePermissions, "DELETE-TENANT")
    );
  }, [authData]);

  const onView = (tenantId) => {
    navigate(`/tenants/view?tenantId=${tenantId}`);
  };
  const onEdit = (tenantId) => {
    navigate(`/tenants/edit?tenantId=${tenantId}`);
  };

  const onDelete = () => {
    console.log("Delete");
  };

  return (
    <Layout title="Tenants">
      <Table
        apiEndPoint={VIEW_TENANTS}
        apiMethod={VIEW_TENANTS_METHOD}
        tableName={"Tenant Details"}
        addPerm={addPerm}
        viewPerm={viewPerm}
        editPerm={editPerm}
        deletePerm={false}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        buttonText={"Add Tenant"}
        buttonClick={() => navigate("/tenants/add")}
      />
    </Layout>
  );
};

export default Tenants;
