import React from "react";
import { useSearchParams } from "react-router-dom";
import RoleDetails from "../RoleDetails";

const ViewRole = () => {
  const [searchParams] = useSearchParams();
  const tenantId = searchParams.get("tenantId");
  const roleId = searchParams.get("roleId");
  return (
    <div>
      <RoleDetails tenantId={tenantId} mode={"view"} roleId={roleId} />
    </div>
  );
};

export default ViewRole;
