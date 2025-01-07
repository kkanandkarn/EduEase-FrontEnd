import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import validateSchema from "../../../utils/ValidateSchema";
import {
  CREATE_TENANT,
  CREATE_TENANT_METHOD,
  GET_GLOBAL_PERMISSIONS,
  GET_GLOBAL_PERMISSIONS_METHOD,
  UPDATE_TENANT,
  UPDATE_TENANT_METHOD,
  VIEW_TENANT_BY_ID,
  VIEW_TENANT_BY_ID_METHOD,
} from "../../../api/endpoints";
import Layout from "../../../layout/Layout";
import { IoArrowBack } from "react-icons/io5";
import DataLoader from "../../../components/DataLoader";
import Inputs from "./Inputs";
import CreateTenantPermissions from "./CreateTenantPermissions";
import Button from "../../../components/Button";
import { FaSave } from "react-icons/fa";
import { CRUDAPI } from "../../../api/crud-api";
import CheckPermission from "../../../utils/CheckPermisison";
import { useSelector } from "react-redux";

const TenantDetails = ({ mode, tenantId = null }) => {
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenantId: tenantId,
    tenantName: "",
    tenantEmail: "",
    tenantContact: "",
    tenantAddress: "",
    tenantLogo: null,
    status: "",
    tenantPermissions: [],
  });
  const [errors, setErrors] = useState({
    tenantName: "",
    tenantEmail: "",
    tenantContact: "",
    tenantAddress: "",
    tenantPermissions: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [imageMsg, setImageMsg] = useState("No file choosen");
  const [imageError, setImageError] = useState(false);
  const [tenantImage, setTenantImage] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [globalPermissions, setGlobalPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const getGlobalPermissions = async () => {
    setDataLoading(true);
    try {
      const resposne = await CRUDAPI(
        GET_GLOBAL_PERMISSIONS,
        GET_GLOBAL_PERMISSIONS_METHOD,
        null,
        navigate
      );
      if (resposne.status === "SUCCESS") {
        setGlobalPermissions(resposne.data);
      }
      if (mode === "edit" || mode === "view") {
        getTenantDetails();
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    } finally {
      setDataLoading(false);
    }
  };

  const getTenantDetails = async () => {
    try {
      const response = await CRUDAPI(
        VIEW_TENANT_BY_ID,
        VIEW_TENANT_BY_ID_METHOD,
        { tenantId },
        navigate
      );
      if (response.status === "SUCCESS") {
        const {
          id: tenantId,
          tenantName,
          tenantLogo,
          tenantEmail,
          tenantContact,
          tenantAddress,
          status,
        } = response.data;
        setFormData({
          tenantId,
          tenantName,
          tenantEmail,
          tenantContact,
          tenantAddress,
          status,
        });
        setFilePreview(tenantLogo.fileUrl);
        setTenantImage(tenantLogo.fileUrl);
        if (response.data.permissions.length) {
          setFormData((prev) => ({
            ...prev,
            tenantPermissions: response.data.permissions.map(
              (p) => p.permissionId
            ),
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

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith("image/");
      const fileSize = file.size / 1024 / 1024;

      if (!fileType) {
        setImageError(true);
        setFilePreview(null);
        setImageMsg("Invalid file type");
        return;
      }

      if (fileSize > 5) {
        setImageError(true);
        setFilePreview(null);
        setImageMsg("File size exceeds 5 MB");
        return;
      }
      setImageError(false);
      setImageMsg("");
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      setTenantImage(file);
      setFormData((prev) => ({
        ...prev,
        tenantLogo: file,
      }));
    }
  };

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
  const validateForm = () => {
    const validate = validateSchema(
      "tenant_create_tenant_post",
      formData,
      errors,
      setErrors
    );

    if (errors.tenantPermissions) {
      console.log("Tenant permission error");
    }

    if (!tenantImage) {
      setImageError(true);
      setImageMsg("Image is required");
    }
    if (!validate || !tenantImage) {
      console.log(validate);
      return false;
    }

    setImageError(false);
    setImageMsg("");
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const data = new FormData();
        if (mode === "edit") {
          data.append("tenantId", formData.tenantId);
          data.append("status", formData.status);
        }
        data.append("tenantName", formData.tenantName);
        data.append("tenantEmail", formData.tenantEmail);
        data.append("tenantContact", formData.tenantContact);
        data.append("tenantAddress", formData.tenantAddress);
        data.append("tenantLogo", formData.tenantLogo);
        if (formData.tenantPermissions.length) {
          formData.tenantPermissions.map((p) => {
            data.append("tenantPermissions", p);
          });
        }

        const response = await CRUDAPI(
          mode === "add" ? CREATE_TENANT : UPDATE_TENANT,
          mode === "add" ? CREATE_TENANT_METHOD : UPDATE_TENANT_METHOD,
          data,
          navigate,
          "formdata"
        );
        if (response.status === "SUCCESS") {
          toast.success(response?.data?.message);
          navigate("/tenants");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Internal Server Error");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getGlobalPermissions();
  }, []);
  return (
    <Layout title={`${mode?.toUpperCase()} TENANT`}>
      <div className={`px-10 py-4 ${mode === "add" && "relative"}`}>
        <div
          className={`flex ${
            mode === "add" ? "justify-center" : "justify-between"
          } items-center mb-4`}
        >
          <button
            className={` ${
              mode === "add" && "absolute top-4 left-10"
            } border-2 border-primaryColor rounded-full p-2 text-primaryColor hover:bg-primaryColor hover:text-white ease-in-out duration-300`}
            onClick={() => navigate("/tenants")}
          >
            <IoArrowBack size={20} />
          </button>
          <h1 className="text-center font-poppins font-bold text-primaryColor border-2 border-primaryColor px-4 py-1 rounded-lg ">
            {mode?.toUpperCase()} TENANT
          </h1>

          {mode !== "add" &&
            CheckPermission(authData?.globalRolePermissions, "VIEW-ROLE") && (
              <div className="flex justify-center items-center gap-4">
                <Button
                  label={"Roles"}
                  onClick={() => navigate(`/tenants/role?tenantId=${tenantId}`)}
                />
                <Button
                  label={"Users"}
                  onClick={() => navigate(`/tenants/user?tenantId=${tenantId}`)}
                />
              </div>
            )}
        </div>

        {dataLoading ? (
          <DataLoader style={"w-20 h-20"} />
        ) : (
          <>
            <div className="border-2 mt-8 rounded-lg">
              <div className="h-4 bg-blue-500 rounded-t-lg"></div>
              <div className="flex">
                <div className="w-3/4 flex items-center px-5">
                  <Inputs
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    mode={mode}
                  />
                </div>

                <div className="w-1/4 flex justify-center">
                  <div className="flex flex-col items-center h-48 w-48 mt-4">
                    <div
                      className={`border-2 h-48 w-48 rounded-lg flex items-center justify-center overflow-hidden ${
                        imageError && "border-red-500"
                      }`}
                    >
                      {filePreview ? (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span
                          className={`text-sm p-2 text-center ${
                            imageError && "text-red-500 "
                          }`}
                        >
                          {imageMsg}
                        </span>
                      )}
                    </div>

                    {mode !== "view" && (
                      <div>
                        <button
                          className="mt-2 border-2 bg-primaryColor rounded-full p-2 flex items-center justify-center text-sm text-white font-Poppins"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          {filePreview ? "Change File" : "Choose Logo"}
                        </button>

                        <input
                          id="fileInput"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <CreateTenantPermissions
                globalPermissions={globalPermissions}
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

export default TenantDetails;
