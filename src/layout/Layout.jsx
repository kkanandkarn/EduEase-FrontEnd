import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import ProfileModal from "../components/Models/ProfileModal";
import Sidebar from "./sidebar";

import { useNavigate } from "react-router-dom";
import ProfileModal from "../components/Models/ProfileModal";

const Layout = ({ children, title = "EDU EASE" }) => {
  const authData = useSelector((state) => state.auth);
  const [profileModal, setProfileModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const dispatch = useDispatch();
  const [firstLetter, setFirstLetter] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setFirstLetter(authData?.user?.userName?.charAt(0));
  }, [authData]);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="h-screen flex bg-white">
        <Toaster position="top-center" reverseOrder={false} />
        <div className=" h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="content-container overflow-auto bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
