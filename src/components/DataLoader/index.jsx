import React from "react";
import LoadingGif from "../LoadingGif";

const DataLoader = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <LoadingGif style={"h-20 w-20"} />
    </div>
  );
};

export default DataLoader;
