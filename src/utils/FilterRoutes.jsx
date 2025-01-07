import Admission from "../pages/Admission/index.jsx";
import CreateRole from "../pages/Role/CreateRole.jsx";
import Roles from "../pages/Role/Roles.jsx";
import UpdateRole from "../pages/Role/UpdateRole/index.jsx";
import ViewRole from "../pages/Role/ViewRole/index.jsx";
import CreateTenantDetails from "../pages/Tenant/CreateTenantDetails";
import Tenants from "../pages/Tenant/Tenants";
import UpdateTenantDetails from "../pages/Tenant/UpdateTenantDetails";
import ViewTenantDetails from "../pages/Tenant/ViewTenantDetails";
import CreateUser from "../pages/User/CreateUser/index.jsx";
import UpdateUser from "../pages/User/UpdateUser/index.jsx";
import Users from "../pages/User/Users.jsx";
import ViewUser from "../pages/User/ViewUser/index.jsx";

export const FilterRoutes = (globalPermissions) => {
  const routes = [
    { path: "/tenants", element: <Tenants />, permission: "VIEW-TENANT" },
    {
      path: "/tenants/add",
      element: <CreateTenantDetails />,
      permission: "CREATE-TENANT",
    },
    {
      path: "/tenants/view",
      element: <ViewTenantDetails />,
      permission: "VIEW-TENANT",
    },
    {
      path: "/tenants/edit",
      element: <UpdateTenantDetails />,
      permission: "UPDATE-TENANT",
    },
    {
      path: "/tenants/role/add",
      element: <CreateRole />,
      permission: "CREATE-ROLE",
    },
    {
      path: "/tenants/role",
      element: <Roles />,
      permission: "VIEW-ROLE",
    },
    {
      path: "/tenants/role/view",
      element: <ViewRole />,
      permission: "VIEW-ROLE",
    },
    {
      path: "/tenants/role/edit",
      element: <UpdateRole />,
      permission: "UPDATE-ROLE",
    },
    {
      path: "/tenants/user",
      element: <Users />,
      permission: "VIEW-USER",
    },
    {
      path: "/tenants/user/add",
      element: <CreateUser />,
      permission: "ADD-USER",
    },
    {
      path: "/tenants/user/view",
      element: <ViewUser />,
      permission: "VIEW-USER",
    },
    {
      path: "/tenants/user/edit",
      element: <UpdateUser />,
      permission: "UPDATE-USER",
    },

    {
      path: "/roles",
      element: <Roles />,
      permission: "VIEW-ROLE",
    },
    {
      path: "/roles/add",
      element: <CreateRole />,
      permission: "CREATE-ROLE",
    },

    {
      path: "/roles/view",
      element: <ViewRole />,
      permission: "VIEW-ROLE",
    },
    {
      path: "/roles/edit",
      element: <UpdateRole />,
      permission: "UPDATE-ROLE",
    },
    {
      path: "/users",
      element: <Users />,
      permission: "VIEW-USER",
    },
    {
      path: "/users/add",
      element: <CreateUser />,
      permission: "ADD-USER",
    },
    {
      path: "/users/view",
      element: <ViewUser />,
      permission: "VIEW-USER",
    },
    {
      path: "/users/edit",
      element: <UpdateUser />,
      permission: "UPDATE-USER",
    },
    {
      path: "/admission",
      element: <Admission />,
      permission: "ADD-STUDENT",
    },
  ];

  const filteredRoutes = routes.filter((route) =>
    globalPermissions.some(
      (permission) => permission.permissionName === route.permission
    )
  );

  return filteredRoutes;
};
