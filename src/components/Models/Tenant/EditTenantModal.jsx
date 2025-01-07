import { TextField } from "@mui/material";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import LoadingGif from "../../LoadingGif";
import { FaSave } from "react-icons/fa";
import validateSchema from "../../../utils/ValidateSchema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CRUDAPI } from "../../../api/crud-api";
import { CREATE_TENANT, CREATE_TENANT_METHOD } from "../../../api/endpoints";

const EditTenantModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [statusOptions, setStatusOptions] = useState([
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Hold",
      label: "Hold",
    },
    {
      value: "Suspended",
      label: "Suspended",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tenantName: "",
    tenantEmail: "",
    tenantContact: "",
    tenantAddress: "",
    tenantLogo: null,
  });
  const [errors, setErrors] = useState({
    tenantName: "",
    tenantEmail: "",
    tenantContact: "",
    tenantAddress: "",
  });
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

  useEffect(() => {
    setFormData({
      ...formData,
      id: product._id,
      productName: product.productName,
      productDesc: product.productDesc,
      price: product.price,
      categoryId: product.category._id,
      image: product.image,
      type: product.type,
      status: product.status,
    });
    setFilePreview(product.image);
    setProductImage(product.image);
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

  const validateForm = () => {
    const validate = validateSchema(
      "tenant_create_tenant_post",
      formData,
      errors,
      setErrors
    );

    if (!tenantImage) {
      setImageError(true);
      setImageMsg("Image is required");
    }
    if (!validate || !tenantImage) {
      return false;
    }

    setImageError(false);
    setImageMsg("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // setLoading(true);
      try {
        console.log("form data: ", formData);

        const data = new FormData();
        data.append("tenantName", formData.tenantName);
        data.append("tenantEmail", formData.tenantEmail);
        data.append("tenantContact", formData.tenantContact);
        data.append("tenantAddress", formData.tenantAddress);
        data.append("tenantLogo", formData.tenantLogo);

        const response = await CRUDAPI(
          CREATE_TENANT,
          CREATE_TENANT_METHOD,
          data,
          navigate
        );
        if (response.status === "SUCCESS") {
          toast.success("Tenant Created Successfully");
          onClose(true);
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
    <div
      className="absolute inset-0  w-[100%] max-h-[100vh] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      {/* Header */}
      <div className="w-[70%] max-h-[60vh] bg-white border-2 border-zinc-400 rounded-lg shadow-lg m-auto flex flex-col">
        <div className="w-full h-14 py-2 bg-primaryColor flex items-center justify-between px-4">
          <div className="text-xl font-Poppins font-bold text-white">
            Add Tenant
          </div>
          <div
            className="text-white cursor-pointer"
            onClick={() => onClose(false, [])}
          >
            <IoMdCloseCircleOutline size={30} />
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-grow flex gap-14 overflow-y-auto p-4 ">
          <div className="flex flex-col w-1/3">
            <TextField
              error={!!errors.tenantName}
              helperText={errors.tenantName}
              margin="normal"
              required
              fullWidth
              id="tenantName"
              label="Tenant Name"
              name="tenantName"
              autoComplete="off"
              autoFocus
              value={formData.tenantName}
              onChange={handleChange}
              placeholder="Enter Tenant Name"
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              error={!!errors.tenantEmail}
              helperText={errors.tenantEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Tenant Email"
              name="tenantEmail"
              autoComplete="off"
              type="email"
              value={formData.tenantEmail}
              onChange={handleChange}
            />
            <TextField
              error={!!errors.tenantContact}
              helperText={errors.tenantContact}
              margin="normal"
              required
              fullWidth
              id="tenantContact"
              label="Tenant Contact"
              name="tenantContact"
              autoComplete="off"
              value={formData.tenantContact}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <TextField
              error={!!errors.tenantAddress}
              helperText={errors.tenantAddress}
              margin="normal"
              required
              fullWidth
              id="tenantAddress"
              label="Tenant Address"
              name="tenantAddress"
              autoComplete="off"
              value={formData.tenantAddress}
              onChange={handleChange}
              multiline
              rows={5}
              sx={{ width: "300px" }}
              placeholder="Enter Tenant Address"
              inputProps={{ maxLength: 150 }}
            />
          </div>
          <div className="flex flex-col items-center h-48 w-40 mt-4">
            <div
              className={`border-2 h-36 w-full flex items-center justify-center ${
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
                {filePreview ? "Change File" : "Choose File"}
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

        {/* Footer (Save Button) */}
        <div className="w-full h-14 flex gap-4 justify-end items-center border-t-2 border-t-zinc-400 p-4">
          <button
            className={`${
              loading ? "bg-slate-400" : "bg-primaryColor"
            } py-2 px-4 rounded-full flex items-center justify-center gap-2 text-xl text-white font-Poppins`}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <LoadingGif /> : <FaSave />}{" "}
            {loading ? "Saving" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTenantModal;
