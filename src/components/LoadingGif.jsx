import React from "react";
import LoadingImg from "../assets/loading.gif";

const LoadingGif = ({ style }) => {
  const customStyle = "w-6 h-6";
  return (
    <div className={style ? style : customStyle}>
      <img src={LoadingImg} alt="Loading" className="h-full w-full" />
    </div>
  );
};

export default LoadingGif;
