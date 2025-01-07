import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ADD_USER,
  ADD_USER_METHOD,
  UPDATE_USER,
  UPDATE_USER_METHOD,
  VIEW_ROLE,
  VIEW_ROLE_METHOD,
  VIEW_USER__BY_ID_METHOD,
  VIEW_USER_BY_ID,
} from "../../../api/endpoints";
import { CRUDAPI } from "../../../api/crud-api";
import Layout from "../../../layout/Layout";
import { IoArrowBack } from "react-icons/io5";
import CheckPermission from "../../../utils/CheckPermisison";
import DataLoader from "../../../components/DataLoader";
import Inputs from "./Inputs";
import Button from "../../../components/Button";
import { FaSave } from "react-icons/fa";
import validateSchema from "../../../utils/ValidateSchema";
import toast from "react-hot-toast";

const UserDetails = ({ mode, tenantId = null, userId = null }) => {
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: userId,
    name: "",
    email: "",
    password: "",
    roleId: "",
    tenantId: tenantId,
    contact: "",
    address: "",
    userImage: null,
    status: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    roleId: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [imageMsg, setImageMsg] = useState("No file choosen");
  const [imageError, setImageError] = useState(false);
  const [userImage, setUserImage] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRoles = async () => {
    setDataLoading(true);
    try {
      const payload = {
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
      const resposne = await CRUDAPI(
        VIEW_ROLE,
        VIEW_ROLE_METHOD,
        payload,
        navigate
      );
      if (resposne.status === "SUCCESS") {
        setRoles(
          resposne.data?.data?.map((role) => ({
            value: role.id,
            label: role.role,
          }))
        );
      }
      if (mode === "edit" || mode === "view") {
        getUser();
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    } finally {
      setDataLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await CRUDAPI(
        VIEW_USER_BY_ID,
        VIEW_USER__BY_ID_METHOD,
        { userId, tenantId },
        navigate
      );
      if (response.status === "SUCCESS") {
        setFormData((prev) => ({
          ...prev,
          name: response.data.name,
          email: response.data.email,
          roleId: response.data.role.roleId,
          contact: response.data.contact,
          address: response.data.address,
          status: response.data.status,
        }));
        setUserImage(response.data.userImage.fileUrl);
        setFilePreview(response.data.userImage.fileUrl);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };
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
      setUserImage(file);
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
    let validate;
    if (mode === "add") {
      validate = validateSchema(
        "user_create_user_post",
        formData,
        errors,
        setErrors
      );
    } else {
      validate = validateSchema(
        "user_update_user_post",
        formData,
        errors,
        setErrors
      );
    }

    if (!validate) {
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
          data.append("userId", formData.userId);
          data.append("status", formData.status);
        }
        if (tenantId) {
          data.append("tenantId", formData.tenantId);
        }
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("roleId", formData.roleId);

        data.append("contact", formData.contact);
        data.append("address", formData.address);
        data.append("userImage", userImage);

        const response = await CRUDAPI(
          mode === "add" ? ADD_USER : UPDATE_USER,
          mode === "add" ? ADD_USER_METHOD : UPDATE_USER_METHOD,
          data,
          navigate,
          "formdata"
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
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Layout title={`${mode?.toUpperCase()} USER`}>
      <div className={`px-10 py-4 relative`}>
        <div className={`flex justify-center items-center mb-4`}>
          <button
            className={` absolute top-4 left-10 border-2 border-primaryColor rounded-full p-2 text-primaryColor hover:bg-primaryColor hover:text-white ease-in-out duration-300`}
            onClick={() => navigate(-1)}
          >
            <IoArrowBack size={20} />
          </button>
          <h1 className="text-center font-poppins font-bold text-primaryColor border-2 border-primaryColor px-4 py-1 rounded-lg ">
            {mode?.toUpperCase()} USER
          </h1>
        </div>

        {dataLoading ? (
          <DataLoader style={"w-20 h-20"} />
        ) : (
          <>
            <div className="border-2 mt-8  rounded-lg">
              <div className="h-4 bg-blue-500 rounded-t-lg"></div>
              <div className="flex">
                <div className="w-3/4 flex items-center px-5">
                  <Inputs
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    mode={mode}
                    roles={roles}
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
                    )}
                  </div>
                </div>
              </div>
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

export default UserDetails;
