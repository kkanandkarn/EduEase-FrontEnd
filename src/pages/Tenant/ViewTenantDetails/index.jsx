import React from "react";
import TenantDetails from "../TenantDetails";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ViewTenantDetails = () => {
  const [searchParams] = useSearchParams();
  const tenantId = searchParams.get("tenantId");

  return (
    <div>
      <TenantDetails tenantId={tenantId} mode={"view"} />
    </div>
  );
};

export default ViewTenantDetails;
