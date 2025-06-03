import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src="/logo000.jpg"
        width={50}
        height={50}
      ></img>

      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
        TLKHMPKV
      </h1>
    </div>
  );
};

export default Logo;
