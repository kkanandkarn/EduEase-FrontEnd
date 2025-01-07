import React from "react";
import { useSearchParams } from "react-router-dom";
import UserDetails from "../UserDetails";

const UpdateUser = () => {
  const [searchParams] = useSearchParams();
  const tenantId = searchParams.get("tenantId");
  const userId = searchParams.get("userId");
  return (
    <div>
      <UserDetails tenantId={tenantId} userId={userId} mode={"edit"} />
    </div>
  );
};

export default UpdateUser;
