import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../../../components/InputBox";
import Button from "../../../components/Button";
import Inputs from "./Inputs";
import {
  ADD_USER,
  ADD_USER_METHOD,
  CREATE_TENANT,
  GET_GLOBAL_PERMISSIONS,
  GET_GLOBAL_PERMISSIONS_METHOD,
  VIEW_ROLE,
  VIEW_ROLE_METHOD,
} from "../../../api/endpoints";
import toast from "react-hot-toast";
import { CRUDAPI } from "../../../api/crud-api";
import validateSchema from "../../../utils/ValidateSchema";

const CreateTenantUsers = ({
  tenantId,
  previousStep,
  nextStep,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(true);

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [imageMsg, setImageMsg] = useState("No file choosen");
  const [imageError, setImageError] = useState(false);
  const [userImage, setUserImage] = useState();
  const [roles, setRoles] = useState([]);
  const [addOther, setAddOther] = useState(true);

  const getRoles = async () => {
    setDataLoading(true);
    const data = {
      search: "",
      sort: {
        attributes: [],
        sorts: [],
      },
      filters: {},

      pageNo: 1,
      itemsPerPage: 10,
      tenantId: tenantId,
    };

    try {
      const response = await CRUDAPI(
        VIEW_ROLE,
        VIEW_ROLE_METHOD,
        data,
        navigate
      );
      if (response.status === "SUCCESS") {
        const roleOptions = response?.data?.data?.map((option) => ({
          value: option.id,
          label: option.role,
        }));
        setRoles(roleOptions);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server Error");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

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
        userImage: file,
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
      "user_create_user_post",
      formData,
      errors,
      setErrors
    );

    if (!validate) {
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
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("roleId", formData.roleId);
        data.append("tenantId", tenantId);
        data.append("contact", formData.contact);
        data.append("address", formData.address);
        data.append("userImage", formData.userImage);

        const response = await CRUDAPI(
          ADD_USER,
          ADD_USER_METHOD,
          data,
          navigate,
          "formdata"
        );
        if (response.status === "SUCCESS") {
          toast.success("User Created Successfully");
          if (addOther) {
            setFormData({
              name: "",
              email: "",
              password: "",
              contact: "",
              address: "",
              userImage: null,
              roleId: "",
            });
          } else {
            nextStep();
          }
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

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center h-48 w-40 mt-4">
          <div
            className={`border-2 h-full rounded-full w-full flex items-center justify-center object-cover ${
              imageError && "border-red-500"
            }`}
          >
            {filePreview ? (
              <img
                src={filePreview}
                alt="Preview"
                className="h-full w-full object-cover"
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
              {filePreview ? "Change File" : "Choose Image"}
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
        roles={roles}
      />
      <div className="flex justify-end items-center my-4 px-10">
        <input
          type="checkbox"
          checked={addOther}
          onChange={(e) => setAddOther(!addOther)}
        />
        <p className="text-sm ml-2">Add Another</p>
      </div>

      <div className="flex justify-between items-center my-4 px-10">
        <Button label={"Previous"} onClick={previousStep} />
        <Button
          label={`${loading ? "Saving..." : "Save and Next"}`}
          onClick={handleSubmit}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default CreateTenantUsers;
