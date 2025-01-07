import React from "react";
import { CiCirclePlus } from "react-icons/ci";

const Button = ({ label, onClick, icon, disabled = false }) => {
  return (
    <div>
      <button
        className={`${
          disabled ? "bg-slate-400" : "bg-primaryColor"
        } rounded-md  text-white flex justify-center items-center py-2 px-4 gap-2 font-bold text-sm hover:bg-slate-400 duration-300 font-poppins`}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        disabled={disabled}
      >
        {icon && icon} {label && label}
      </button>
    </div>
  );
};

export default Button;
