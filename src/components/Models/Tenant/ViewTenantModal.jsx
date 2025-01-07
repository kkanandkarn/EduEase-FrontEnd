import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { CRUDAPI } from "../../../api/crud-api";
import {
  VIEW_TENANT_BY_ID,
  VIEW_TENANT_BY_ID_METHOD,
} from "../../../api/endpoints";
import { useNavigate } from "react-router-dom";

const ViewTenantModal = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [tenant, setTenant] = useState();
  const navigate = useNavigate();
  const getTenant = async (req) => {
    setLoading(true);
    try {
      const response = await CRUDAPI(
        VIEW_TENANT_BY_ID,
        VIEW_TENANT_BY_ID_METHOD,
        { id: id },
        navigate
      );
      if (response.status === "SUCCESS") {
        setTenant(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      onClose(false);
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTenant();
  }, []);
  return (
    <div
      className="absolute inset-0  w-[100%] max-h-[100vh] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      {/* Header */}
      <div className="w-[70%] max-h-[60vh] bg-white border-2 border-zinc-400 rounded-lg shadow-lg m-auto flex flex-col">
        <div className="w-full h-14 py-2 bg-primaryColor flex items-center justify-between px-4">
          <div className="text-xl font-Poppins font-bold text-white">
            Add Tenant
          </div>
          <div
            className="text-white cursor-pointer"
            onClick={() => onClose(false)}
          >
            <IoMdCloseCircleOutline size={30} />
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-grow flex gap-14 overflow-y-auto p-4 ">
          <div className="flex flex-col w-1/3">
            <TextField
              margin="normal"
              required
              fullWidth
              id="tenantName"
              label="Tenant Name"
              name="tenantName"
              autoComplete="off"
              autoFocus
              value={tenant.tenantName}
              placeholder="Enter Tenant Name"
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Tenant Email"
              name="tenantEmail"
              autoComplete="off"
              type="email"
              value={tenant.tenantEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="tenantContact"
              label="Tenant Contact"
              name="tenantContact"
              autoComplete="off"
              value={tenant.tenantContact}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <TextField
              margin="normal"
              required
              fullWidth
              id="tenantAddress"
              label="Tenant Address"
              name="tenantAddress"
              autoComplete="off"
              value={tenant.tenantAddress}
              multiline
              rows={5}
              sx={{ width: "300px" }}
              placeholder="Enter Tenant Address"
              inputProps={{ maxLength: 150 }}
            />
          </div>
          <div className="flex flex-col items-center h-48 w-40 mt-4">
            <div
              className={`border-2 h-36 w-full flex items-center justify-center`}
            >
              <img
                src={tenant.tenantLogo.fileUrl}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTenantModal;
