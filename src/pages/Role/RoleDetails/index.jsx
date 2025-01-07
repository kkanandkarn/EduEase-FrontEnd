import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { IoArrowBack } from "react-icons/io5";
import Button from "../../../components/Button";
import { FaSave } from "react-icons/fa";
import DataLoader from "../../../components/DataLoader";
import {
  ADD_ROLE,
  ADD_ROLE_METHOD,
  GET_TENANT_PERMISSIONS,
  GET_TENANT_PERMISSIONS_METHOD,
  UPDATE_ROLE,
  UPDATE_ROLE_METHOD,
  VIEW_ROLE_BY_ID,
  VIEW_ROLE_BY_ID_METHOD,
} from "../../../api/endpoints";
import toast from "react-hot-toast";
import { CRUDAPI } from "../../../api/crud-api";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../../../components/InputBox";
import Dropdown from "../../../components/Dropdown";
import { statusOptions } from "../../../utils/constant";
import CreateRolePermissions from "./CreateRolePermissions";

const RoleDetails = ({ mode, tenantId = null, roleId = null }) => {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [tenantPermissions, setTenantPermissions] = useState({});
  const [formData, setFormData] = useState({
    roleName: "",
    status: "",
    permissions: [],
  });
  const [errors, setErrors] = useState({
    roleName: "",
  });
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const navigate = useNavigate();

  const getTenantPermissions = async () => {
    setDataLoading(true);

    try {
      const resposne = await CRUDAPI(
        GET_TENANT_PERMISSIONS,
        GET_TENANT_PERMISSIONS_METHOD,
        { tenantId },
        navigate
      );
      if (resposne.status === "SUCCESS") {
        setTenantPermissions(resposne.data);
        if (mode === "edit" || mode === "view") {
          getRoleDetails();
        }
      } else {
        toast.error(resposne.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    } finally {
      setDataLoading(false);
    }
  };
  const getRoleDetails = async () => {
    try {
      const response = await CRUDAPI(
        VIEW_ROLE_BY_ID,
        VIEW_ROLE_BY_ID_METHOD,
        { roleId, tenantId },
        navigate
      );
      if (response.status === "SUCCESS") {
        const {
          id: roleId,
          role: roleName,
          status,
          permissions,
        } = response.data;
        setFormData({
          roleId,
          roleName,
          status,
          permissions,
        });

        if (response.data.permissions.length) {
          setFormData((prev) => ({
            ...prev,
            permissions: response.data.permissions.map((p) => p.permissionId),
          }));
          setSelectedPermissions(
            response.data.permissions.map((p) => p.permissionId)
          );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    getTenantPermissions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleSubmit = async () => {
    if (!formData.roleName) {
      setErrors((prev) => ({
        ...prev,
        roleName: "Role Name is required",
      }));
      return;
    }

    setLoading(true);
    try {
      const data = {
        tenantId,
        role: {
          roleName: formData.roleName,
          permissions: formData.permissions,
        },
      };
      if (mode === "edit") {
        data.role.roleId = formData.roleId;
        data.role.status = formData.status;
      }
      const response = await CRUDAPI(
        mode === "add" ? ADD_ROLE : UPDATE_ROLE,
        mode === "add" ? ADD_ROLE_METHOD : UPDATE_ROLE_METHOD,
        data,
        navigate
      );
      if (response.status === "SUCCESS") {
        toast.success(response?.data?.message);
        navigate(-1);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={`${mode?.toUpperCase()} ROLE`}>
      <div className="px-10 py-4 relative">
        <div className="flex justify-center items-center mb-4">
          <button
            className="absolute top-4 left-10 border-2 border-primaryColor rounded-full p-2 text-primaryColor hover:bg-primaryColor hover:text-white ease-in-out duration-300"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack size={20} />
          </button>
          <h1 className="text-center font-poppins font-bold text-primaryColor border-2 border-primaryColor px-4 py-1 rounded-lg ">
            {mode?.toUpperCase()} ROLE
          </h1>
        </div>

        {dataLoading ? (
          <DataLoader style={"w-20 h-20"} />
        ) : (
          <>
            <div className="border-2 mt-8 rounded-lg">
              <div className="h-4 bg-blue-500 rounded-t-lg"></div>
              <div className="grid grid-cols-2  w-full gap-4 px-4 items-center justify-center">
                <InputBox
                  error={!!errors.roleName}
                  helperText={errors.roleName}
                  requireds
                  type={"text"}
                  id={"roleName"}
                  label={"Role"}
                  name={"roleName"}
                  autoFocus={mode !== "view"}
                  value={formData.roleName}
                  onChange={mode === "view" ? null : handleChange}
                  placeholder={"Enter Role Name"}
                  inputProps={{ maxLength: 100 }}
                />
                {mode !== "add" && (
                  <div className="mt-2">
                    <Dropdown
                      handleChange={mode === "view" ? null : handleChange}
                      label={"Status"}
                      name={"status"}
                      options={statusOptions}
                      value={formData.status}
                    />
                  </div>
                )}
              </div>
              <CreateRolePermissions
                tenantPermissions={tenantPermissions}
                setFormData={setFormData}
                selectedPermissions={selectedPermissions}
                setSelectedPermissions={setSelectedPermissions}
                mode={mode}
              />
            </div>
            {mode !== "view" && (
              <div className="mt-4 flex justify-center">
                <Button
                  label={loading ? "SAVING..." : "SAVE"}
                  disabled={loading}
                  icon={<FaSave />}
                  onClick={handleSubmit}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default RoleDetails;
