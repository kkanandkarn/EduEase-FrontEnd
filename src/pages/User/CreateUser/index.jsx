import React from "react";
import UserDetails from "../UserDetails";
import { useSearchParams } from "react-router-dom";

const CreateUser = () => {
  const [searchParams] = useSearchParams();
  const tenantId = searchParams.get("tenantId");
  return (
    <div>
      <UserDetails mode={"add"} tenantId={tenantId} />
    </div>
  );
};

export default CreateUser;
