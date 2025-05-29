import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";

const DetailsCard = ({ details }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleCardClick = () => {
    navigate(`/details/${details.id}`);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className="max-h-50 bg-white rounded border p-4 overflow-hidden shadow-lg flex flex-col md:flex-row gap-4"
      onClick={handleCardClick}
    >
      {/* LEFT: Image */}
      <div className="md:w-1/5 h-32">
        {details?.imageURL ? (
          <div className="relative w-full h-40 md:h-full">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingOutlined className="text-3xl text-gray-400" spin />
              </div>
            )}
            <img
              className={`w-full h-full object-cover rounded transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={details.imageURL}
              alt={details.name || "Course Image"}
              onLoad={handleImageLoad}
            />
          </div>
        ) : (
          <div className="w-full h-full rounded bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
      </div>

      {/* RIGHT: Text content */}
      <div className="md:w-4/5 w-full flex flex-col justify-center">
        <div className="font-medium text-xl mb-2">{details.name}</div>
        <span className="text-gray-700"> {details?.description}</span>
      </div>
    </div>
  );
};

export default DetailsCard;
