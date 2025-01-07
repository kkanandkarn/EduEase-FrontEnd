import React from "react";

const CheckPermission = (globalRolePermissions, permissionName) => {
  return globalRolePermissions?.some(
    (permission) => permission.permissionName === permissionName
  );
};

export default CheckPermission;
