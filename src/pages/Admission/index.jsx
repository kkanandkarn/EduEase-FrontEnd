import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Button from "../../components/Button";
import DataLoader from "../../components/DataLoader";
import Inputs from "./Inputs";

const Admission = () => {
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    villageCity: "",
    stateId: null,
    districtId: null,
    userImage: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    villageCity: "",
    stateId: null,
    districtId: null,
    userImage: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [imageMsg, setImageMsg] = useState("No file choosen");
  const [imageError, setImageError] = useState(false);
  const [userImage, setUserImage] = useState();
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

  useEffect(() => {}, []);

  return (
    <Layout title="Admission">
      <div className="px-10 py-4">
        <div className={`flex justify-between items-center mb-4`}>
          <button
            className={` border-2 border-primaryColor rounded-full p-2 text-primaryColor hover:bg-primaryColor hover:text-white ease-in-out duration-300`}
            onClick={() => navigate(-1)}
          >
            <IoArrowBack size={20} />
          </button>
          <h1 className="text-center font-poppins font-bold text-primaryColor border-2 border-primaryColor px-4 py-1 rounded-lg ">
            ADD STUDENT
          </h1>
          <Button onClick={() => {}} label={"Requests"} />
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
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Admission;
