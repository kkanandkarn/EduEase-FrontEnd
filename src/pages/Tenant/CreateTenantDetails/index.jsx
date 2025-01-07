import React from "react";
import TenantDetails from "../TenantDetails";
import { useNavigate, useSearchParams } from "react-router-dom";

const CreateTenantDetails = () => {
 
  return (
    <div>
      <TenantDetails mode={"add"} />
    </div>
  );
};

export default CreateTenantDetails;
