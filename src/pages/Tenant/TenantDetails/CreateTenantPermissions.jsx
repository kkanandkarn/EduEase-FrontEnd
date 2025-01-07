import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CreateTenantPermissions = ({
  setFormData,
  globalPermissions,
  selectedPermissions,
  setSelectedPermissions,
  mode,
}) => {
  const [expandedParents, setExpandedParents] = useState([]);

  const handleParentToggle = (parent) => {
    setExpandedParents((prev) =>
      prev.includes(parent)
        ? prev.filter((p) => p !== parent)
        : [...prev, parent]
    );
  };

  const handleParentCheckbox = (parent, childIds) => {
    if (mode === "view") return;
    const isSelected = childIds.every((id) => selectedPermissions.includes(id));
    setSelectedPermissions(
      (prev) =>
        isSelected
          ? prev.filter((id) => !childIds.includes(id)) // Deselect all children
          : [...prev, ...childIds.filter((id) => !prev.includes(id))] // Select all children
    );
  };

  const handleChildCheckbox = (id) => {
    if (mode === "view") return;
    setSelectedPermissions(
      (prev) =>
        prev.includes(id)
          ? prev.filter((permId) => permId !== id) // Deselect child
          : [...prev, id] // Select child
    );
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      tenantPermissions: selectedPermissions,
    }));
  }, [selectedPermissions]);

  return (
    <div className="mt-4 mx-2 px-4 py-2">
      <div className="">
        <h3 className="text-lg font-semibold text-primaryColor mb-4">
          Permissions
        </h3>
      </div>
      {Object.entries(globalPermissions || {}).map(([parent, children]) => (
        <div key={parent} className="mb-4">
          {/* Parent Checkbox */}
          <div
            className="flex items-center border-2 px-4 py-2 text-lg uppercase rounded-lg cursor-pointer gap-4"
            onClick={() => handleParentToggle(parent)}
          >
            <input
              type="checkbox"
              checked={children.every((child) =>
                selectedPermissions.includes(child.id)
              )}
              onChange={() =>
                handleParentCheckbox(
                  parent,
                  children.map((child) => child.id)
                )
              }
              size={20}
            />
            <div>
              <div>{parent}</div>
            </div>
          </div>

          {/* Child Permissions */}
          {expandedParents.includes(parent) && (
            <div className="ml-6 mt-2">
              {children.map((child) => (
                <div key={child.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(child.id)}
                    onChange={() => handleChildCheckbox(child.id)}
                  />
                  <span className="ml-2">{child.permissionName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CreateTenantPermissions;
