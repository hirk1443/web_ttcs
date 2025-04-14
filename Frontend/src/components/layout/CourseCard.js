import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";

const CourseCard = ({ course, showDetails }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleCardClick = () => {
    navigate(`/course/${course.id}`);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className="min-h-80 bg-white rounded border p-3 overflow-hidden shadow-lg"
      onClick={handleCardClick}
    >
      <div className="border-b cursor-pointer">
        {course?.imageURL ? (
          <div className="relative w-full h-36 md:h-40">
            {!isImageLoaded && (
              <div className="absolute inset-0  flex items-center justify-center">
                <LoadingOutlined className="text-3xl text-gray-400" spin />
              </div>
            )}
            <img
              className={`w-full rounded object-cover h-36 md:h-40 transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={course.imageURL}
              alt={course.name || "Course Image"}
              onLoad={handleImageLoad}
            />
          </div>
        ) : (
          <div className="w-full rounded bg-gray-200 flex items-center justify-center h-36 md:h-40">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="font-medium text-lg line-clamp-1 ">{course.name}</div>

        <span className="flex items-center">
          Giáo viên:
          {` ${course?.teacher} `}
        </span>

        {showDetails === undefined ? (
          <div className="flex items-center justify-between mt-4">
            <div className="py-2 px-7 w-full text-center bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full cursor-pointer hover:scale-105 transition-transform duration-300">
              <button>Xem chi tiết</button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
