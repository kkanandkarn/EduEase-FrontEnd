import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTenantRoles from "./CreateTenantRoles";
import CreateTenantUsers from "./CreateTenantUsers";
import Layout from "../../layout/Layout";
import CreateTenantDetails from "./CreateTenantDetails";
import { Step, StepLabel, Stepper } from "@mui/material";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../components/Loader";
import toast from "react-hot-toast";
import { CRUDAPI } from "../../api/crud-api";
import {
  GET_GLOBAL_PERMISSIONS,
  GET_GLOBAL_PERMISSIONS_METHOD,
} from "../../api/endpoints";
import { setGLobalPermissions } from "../../store/globalPermissions";

const CreateTenant = () => {
  const [tenantId, setTenantId] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [tenantFormData, setTenantFormData] = useState({
    tenantId: null,
    tenantName: "",
    tenantEmail: "",
    tenantContact: "",
    tenantAddress: "",
    tenantLogo: null,
    tenantPermissions: [],
    editFlag: false,
  });
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    userImage: null,
    roleId: "",
  });
  const [errors, setErrors] = useState({
    tenantName: "",
    tenantEmail: "",
    tenantContact: "",
    tenantAddress: "",
    tenantPermissions: "",
    name: "",
    email: "",
    password: "",
    contact: "",
    roleId: "",
  });
  const [roles, setRoles] = useState([
    {
      index: Date.now(),
      roleId: null,
      roleName: "",
      permissions: [],
      expandedParents: [],
      editFlag: false,
    },
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const previousStep = () => {
    if (step === 1) {
      return;
    }
    setStep(step - 1);
  };
  const nextStep = () => {
    if (step === 3) {
      navigate("/tenants");
    }
    setStep(step + 1);
  };

  const tenantPages = {
    1: (
      <CreateTenantDetails
        setTenantId={setTenantId}
        previousStep={previousStep}
        nextStep={nextStep}
        formData={tenantFormData}
        setFormData={setTenantFormData}
        errors={errors}
        setErrors={setErrors}
      />
    ),
    2: (
      <CreateTenantRoles
        tenantId={tenantId}
        setRoleId={setRoleId}
        previousStep={previousStep}
        nextStep={nextStep}
        roles={roles}
        setRoles={setRoles}
      />
    ),
    3: (
      <CreateTenantUsers
        tenantId={tenantId}
        previousStep={previousStep}
        nextStep={nextStep}
        formData={userFormData}
        setFormData={setUserFormData}
        errors={errors}
        setErrors={setErrors}
      />
    ),
  };

  return (
    <Layout title="Create Tenant">
      <div className="flex justify-between mt-4 px-8">
        <div className="border-2 flex justify-center items-center rounded-lg px-2 border-primaryColor">
          <Header title="Create Tenant" />
        </div>
        <div className="flex border-2 ">
          <div
            className={`flex justify-center items-center ${
              step === 1 ? "bg-primaryColor text-white" : "text-primaryColor"
            } px-6 py-2 text-sm font-bold font-poppins ease-in-out duration-300 border-r-2`}
          >
            Tenant Details
          </div>
          <div
            className={`flex justify-center items-center ${
              step === 2 ? "bg-primaryColor text-white" : "text-primaryColor"
            } px-6 py-2 text-sm font-bold font-poppins ease-in-out duration-300 border-r-2`}
          >
            Tenant Roles
          </div>
          <div
            className={`flex justify-center items-center ${
              step === 3 ? "bg-primaryColor text-white" : "text-primaryColor"
            } px-6 py-2 text-sm font-bold font-poppins ease-in-out duration-300`}
          >
            Tenant Users
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="w-full">{tenantPages[step]}</div>
      </div>
    </Layout>
  );
};

export default CreateTenant;
