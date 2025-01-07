import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setSidebar } from "../store/sidebarSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { sidebarItems } from "./sidebar-items";
import { FaPowerOff } from "react-icons/fa6";
import { logout } from "../store/authSlice";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
  const authData = useSelector((state) => state.auth);
  const sidebar = useSelector((state) => state.sidebar);
  const [sidebarOpen, setSidebarOpen] = useState(sidebar.sidebarOpen);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) navigate("/");

    // Always include the Dashboard item
    const filteredItems = sidebarItems.filter((route) => {
      if (route.name === "Dashboard") {
        return true; // Always include the Dashboard item
      }
      console.log(route);

      // Filter other items based on permissions
      return authData.globalRolePermissions.some(
        (permission) => permission.permissionName === route.permission
      );
    });

    setMenuItems(filteredItems);
  }, [authData, navigate]);

  useEffect(() => {
    setSidebarOpen(sidebar.sidebarOpen);
  }, [sidebar]);

  const handleMenuClick = (route) => navigate(route);

  const handleSidebar = () => {
    dispatch(setSidebar({ sidebarOpen: !sidebarOpen }));
  };

  const isActiveMenu = (route) => location.pathname.includes(route);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-primaryColor text-white h-screen duration-300 ease-in-out`}
    >
      <div className="flex justify-end">
        <button
          className="bg-white text-primaryColor mt-4 px-2 py-1 rounded-l-lg ease-in-out duration-300"
          onClick={handleSidebar}
        >
          {sidebarOpen ? (
            <IoIosArrowBack size={20} />
          ) : (
            <IoIosArrowForward size={20} />
          )}
        </button>
      </div>
      <div
        className={`flex flex-col justify-start ${
          sidebarOpen && "items-center"
        } mb-4 px-4 ease-in-out duration-300`}
      >
        <img
          src={authData?.tenant?.tenantLogo?.fileUrl}
          alt="logo"
          className={`${sidebarOpen ? "w-14 h-14" : "w-10 h-10"} duration-300`}
        />
        {sidebarOpen && (
          <h1 className="font-Poppins text-sm font-bold mt-2">
            {authData?.tenant.tenantName}
          </h1>
        )}
      </div>
      <ul className="px-4 ease-in-out duration-300">
        {menuItems.map((menuItem) => (
          <li
            key={menuItem.name}
            className="mb-2 cursor-pointer"
            onClick={() => handleMenuClick(menuItem.route)}
          >
            <div
              className={`text-left px-4 py-2 rounded-md font-Poppins flex items-center  ${
                !sidebarOpen ? "justify-center text-xl" : "text-base"
              } gap-2 text-white ${
                isActiveMenu(menuItem.route) ? "bg-slate-800" : ""
              }`}
              data-tooltip-id={`tooltip-${menuItem.name}`} // Tooltip ID
              data-tooltip-content={menuItem.name} // Tooltip Content
            >
              <div
                className={`${
                  isActiveMenu(menuItem.route) ? "text-orange-400" : ""
                } `}
              >
                {menuItem.icon}
              </div>
              {sidebarOpen && menuItem.name}
            </div>

            {!sidebarOpen && (
              <Tooltip id={`tooltip-${menuItem.name}`} place="right" />
            )}
          </li>
        ))}
        <li>
          <button
            className={`text-left px-4 py-2 rounded-md font-Poppins flex items-center  ${
              !sidebarOpen ? "justify-center text-xl" : "text-sm"
            } gap-2 text-white`}
            onClick={handleLogout}
          >
            <FaPowerOff />
            {sidebarOpen && "Logout"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
