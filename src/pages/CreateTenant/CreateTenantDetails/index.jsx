import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import validateSchema from "../../../utils/ValidateSchema";
import InputBox from "../../../components/InputBox";

import Button from "../../../components/Button";
import Inputs from "./Inputs";
import { CRUDAPI } from "../../../api/crud-api";
import {
  CREATE_TENANT,
  CREATE_TENANT_METHOD,
  GET_GLOBAL_PERMISSIONS,
  GET_GLOBAL_PERMISSIONS_METHOD,
} from "../../../api/endpoints";

import DataLoader from "../../../components/DataLoader";
import toast from "react-hot-toast";
import CreateTenantPermissions from "./CreateTenantPermissions1";

const CreateTenantDetails = ({
  setTenantId,
  previousStep,
  nextStep,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const navigate = useNavigate();
  const [globalPermissions, setGLobalPermissions] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
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
        setGLobalPermissions(resposne.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    } finally {
      setDataLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [imageMsg, setImageMsg] = useState("No file choosen");
  const [imageError, setImageError] = useState(false);
  const [tenantImage, setTenantImage] = useState();

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
          CREATE_TENANT,
          CREATE_TENANT_METHOD,
          data,
          navigate,
          "formdata"
        );
        if (response.status === "SUCCESS") {
          toast.success("Tenant Created Successfully");
          setTenantId(response.data.tenantId);
          setFormData((prev) => ({
            tenantId: response.data.tenantId,
            editFlag: true,
            ...prev,
          }));
          nextStep();
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
    <div>
      {dataLoading ? (
        <DataLoader />
      ) : (
        <>
          <div className="flex justify-center">
            <div className="flex flex-col items-center h-48 w-40 mt-4">
              <div
                className={`border-2 h-full w-full rounded-lg flex items-center justify-center object-cover ${
                  imageError && "border-red-500"
                }`}
              >
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="h-48 w-40 object-cover rounded-lg"
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

              <div>
                <button
                  className="mt-2 border-2 bg-primaryColor rounded-full p-2 flex items-center justify-center text-sm text-white font-Poppins"
                  onClick={() => document.getElementById("fileInput").click()}
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
            </div>
          </div>

          <Inputs
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />

          <CreateTenantPermissions
            setFormData={setFormData}
            globalPermissions={globalPermissions}
          />
          <div className="flex justify-end my-4 px-10">
            <Button
              label={`${loading ? "Saving..." : "Save and Next"}`}
              // onClick={handleSubmit}
              onClick={() => {
                setTenantId(1);
                nextStep();
              }}
              disabled={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTenantDetails;
