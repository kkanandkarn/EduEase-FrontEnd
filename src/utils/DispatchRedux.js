import { login } from "../store/authSlice";

export const DispatchRedux = (dispatch) => {
  const token = localStorage.getItem("Authorization");
  const user = localStorage.getItem("user");
  const globalRolePermissions = localStorage.getItem("globalRolePermissions");

  if (token && user && globalRolePermissions) {
    const parsedUser = JSON.parse(user);
    const parsedPermissions = JSON.parse(globalRolePermissions);

    dispatch(
      login({
        user: {
          userId: parsedUser.userId,
          userName: parsedUser.userName,
          userEmail: parsedUser.userEmail,
          userContact: parsedUser.userContact,
          userAddress: parsedUser.userAddress,
          roleId: parsedUser.roleId,
          role: parsedUser.role,
          status: parsedUser.status,
        },
        tenant: {
          tenantId: parsedUser.tenantId,
          tenantName: parsedUser.tenantName,
          tenantEmail: parsedUser.tenantEmail,
          tenantContact: parsedUser.tenantContact,
          tenantAddress: parsedUser.tenantAddress,
          tenantLogo: parsedUser.tenantLogo,
        },
        token,
        globalRolePermissions: parsedPermissions,
      })
    );
    return {
      globalRolePermissions: parsedPermissions,
      user: parsedUser,
      token: token,
    };
  }
  return null;
};
