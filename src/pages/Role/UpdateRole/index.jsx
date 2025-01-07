import React from "react";
import { useSearchParams } from "react-router-dom";
import RoleDetails from "../RoleDetails";

const UpdateRole = () => {
  const [searchParams] = useSearchParams();
  const tenantId = searchParams.get("tenantId");
  const roleId = searchParams.get("roleId");
  return (
    <div>
      <RoleDetails tenantId={tenantId} mode={"edit"} roleId={roleId} />
    </div>
  );
};

export default UpdateRole;
