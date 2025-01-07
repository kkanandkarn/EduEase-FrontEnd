import { MdDashboard } from "react-icons/md";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import { IoHomeOutline } from "react-icons/io5";
import { FaClipboardUser } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserPlus } from "react-icons/hi2";

export const sidebarItems = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
    route: "/dashboard",
  },
  {
    name: "Tenants",
    icon: <IoHomeOutline />,
    route: "/tenants",
    permission: "VIEW-TENANT",
  },
  {
    name: "Roles",
    icon: <FaClipboardUser />,
    route: "/roles",
    permission: "VIEW-ROLE",
  },
  {
    name: "Users",
    icon: <FaUserFriends />,
    route: "/users",
    permission: "VIEW-USER",
  },
  {
    name: "Admission",
    icon: <HiMiniUserPlus />,
    route: "/admission",
    permission: "ADD-STUDENT",
  },
];
