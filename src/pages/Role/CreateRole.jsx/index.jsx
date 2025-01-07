import React from "react";
import { useSearchParams } from "react-router-dom";
import RoleDetails from "../RoleDetails";

const CreateRole = () => {
  const [searchParams] = useSearchParams();
  const tenantId = searchParams.get("tenantId");
  return (
    <div>
      <RoleDetails tenantId={tenantId} mode={"add"} />
    </div>
  );
};

export default CreateRole;
