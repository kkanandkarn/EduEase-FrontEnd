import React, { useEffect, useState } from "react";
import InputBox from "../../../components/InputBox";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  ADD_ROLE,
  ADD_ROLE_METHOD,
  GET_TENANT_PERMISSIONS,
  GET_TENANT_PERMISSIONS_METHOD,
} from "../../../api/endpoints";
import { useNavigate } from "react-router-dom";
import DataLoader from "../../../components/DataLoader";
import toast from "react-hot-toast";
import { CRUDAPI } from "../../../api/crud-api";

const CreateTenantRoles = ({
  tenantId,
  setRoleId,
  previousStep,
  nextStep,
  roles,
  setRoles,
}) => {
  const [tenantPermissions, setTenantPermissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();

  const getTenantPermissions = async () => {
    setDataLoading(true);

    try {
      const resposne = await CRUDAPI(
        GET_TENANT_PERMISSIONS,
        GET_TENANT_PERMISSIONS_METHOD,
        { tenantId },
        navigate
      );
      if (resposne.status === "SUCCESS") {
        setTenantPermissions(resposne.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getTenantPermissions();
  }, []);

  const addRole = () => {
    setRoles([
      ...roles,
      {
        index: Date.now(),
        roleName: "",
        permissions: [],
        expandedParents: [],
      },
    ]);
  };

  const handleParentToggle = (roleIndex, parent) => {
    setRoles((prevRoles) => {
      const newRoles = [...prevRoles];
      const expandedParents = newRoles[roleIndex].expandedParents;
      newRoles[roleIndex].expandedParents = expandedParents.includes(parent)
        ? expandedParents.filter((p) => p !== parent)
        : [...expandedParents, parent];
      return newRoles;
    });
  };

  const handleParentCheckbox = (roleIndex, parent, childIds) => {
    setRoles((prevRoles) => {
      const newRoles = [...prevRoles];
      const isSelected = childIds.every((id) =>
        newRoles[roleIndex].permissions.includes(id)
      );

      newRoles[roleIndex].permissions = isSelected
        ? newRoles[roleIndex].permissions.filter((id) => !childIds.includes(id)) // Deselect all children
        : [
            ...newRoles[roleIndex].permissions,
            ...childIds.filter(
              (id) => !newRoles[roleIndex].permissions.includes(id)
            ),
          ]; // Select all children

      return newRoles;
    });
  };

  const handleChildCheckbox = (roleIndex, childId) => {
    setRoles((prevRoles) => {
      const newRoles = [...prevRoles];
      newRoles[roleIndex].permissions = newRoles[
        roleIndex
      ].permissions.includes(childId)
        ? newRoles[roleIndex].permissions.filter((id) => id !== childId) // Deselect child
        : [...newRoles[roleIndex].permissions, childId]; // Select child
      return newRoles;
    });
  };

  const removeRole = (roleIndex) => {
    setRoles((prevRoles) => prevRoles.filter((_, i) => i !== roleIndex));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        tenantId: tenantId,
        roles: roles.map((role) => ({
          roleName: role.roleName,
          permissions: role.permissions,
        })),
      };
      if (!data.roles.length) {
        toast.error("Minimum 1 role is required");
        return;
      }
      const response = await CRUDAPI(ADD_ROLE, ADD_ROLE_METHOD, data, navigate);
      if (response.status === "SUCCESS") {
        toast.success("Roles Created Successfully");
      }
      nextStep();
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {dataLoading ? (
        <DataLoader />
      ) : (
        <>
          <div className="px-10">
            {roles.map((role, roleIndex) => (
              <div key={role.index} className="mb-6">
                <InputBox
                  required={true}
                  id={`role-${roleIndex}`}
                  label={"Role Name"}
                  name={"roleName"}
                  value={role.roleName}
                  onChange={(e) => {
                    const newRoles = [...roles];
                    newRoles[roleIndex].roleName = e.target.value;
                    setRoles(newRoles);
                  }}
                  placeholder="Enter Role Name"
                  inputProps={{ maxLength: 100 }}
                />
                <div className="mt-4 mx-8 px-4 py-2 border-2 rounded-lg">
                  <h3 className="text-lg font-semibold text-primaryColor mb-4">
                    Permissions for {role.roleName || "Role"}
                  </h3>
                  {Object.entries(tenantPermissions || {}).map(
                    ([parent, children]) => (
                      <div key={parent} className="mb-4">
                        {/* Parent Checkbox */}
                        <div
                          className="flex items-center border-2 px-4 py-2 text-lg uppercase rounded-lg cursor-pointer gap-4"
                          onClick={() => handleParentToggle(roleIndex, parent)}
                        >
                          <input
                            type="checkbox"
                            checked={children.every((child) =>
                              role.permissions.includes(child.id)
                            )}
                            onChange={(e) =>
                              handleParentCheckbox(
                                roleIndex,
                                parent,
                                children.map((child) => child.id)
                              )
                            }
                          />
                          <div>{parent}</div>
                        </div>

                        {/* Child Permissions */}
                        {role.expandedParents.includes(parent) && (
                          <div className="ml-6 mt-2">
                            {children.map((child) => (
                              <div
                                key={child.id}
                                className="flex items-center mb-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={role.permissions.includes(child.id)}
                                  onChange={() =>
                                    handleChildCheckbox(roleIndex, child.id)
                                  }
                                />
                                <span className="ml-2">
                                  {child.permissionName}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
                <div className="w-full flex justify-end mt-2 px-8">
                  <button
                    onClick={() => removeRole(roleIndex)}
                    disabled={roles.length === 1}
                  >
                    <MdDeleteOutline size={25} color="red" />
                  </button>
                </div>
              </div>
            ))}
            <div className="w-full flex justify-end">
              <Button
                label={"Add Role"}
                icon={<IoIosAddCircleOutline size={20} />}
                onClick={addRole}
              />
            </div>
          </div>
          <div className="flex justify-between my-8 px-10">
            <Button label={"Previous"} onClick={previousStep} />
            <Button
              label={`${loading ? "Saving..." : "Save and Next"}`}
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTenantRoles;
