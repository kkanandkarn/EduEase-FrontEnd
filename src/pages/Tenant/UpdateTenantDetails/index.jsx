import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import TenantDetails from "../TenantDetails";

const UpdateTenantDetails = () => {
  const [searchParams] = useSearchParams();
  const tenantId = searchParams.get("tenantId");

  return (
    <div>
      <TenantDetails tenantId={tenantId} mode={"edit"} />
    </div>
  );
};

export default UpdateTenantDetails;
