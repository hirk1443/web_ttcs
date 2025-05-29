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
      className="min-h-80 bg-white rounded-xl border p-4 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="border-b">
        {course?.imageURL ? (
          <div className="relative w-full h-40">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingOutlined className="text-3xl text-gray-400" spin />
              </div>
            )}
            <img
              className={`w-full rounded-md object-cover h-40 transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={course.imageURL}
              alt={course.name || "Course Image"}
              onLoad={handleImageLoad}
            />
          </div>
        ) : (
          <div className="w-full rounded bg-gray-200 flex items-center justify-center h-40">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <div className="font-semibold text-lg text-gray-800 line-clamp-1">
          {course.name}
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Giáo viên:</span> {course?.teacher}
        </div>

        {showDetails === undefined ? (
          <div className="mt-4">
            <div className="py-2 px-5 w-full text-center bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full hover:scale-105 hover:brightness-110 transition-transform duration-300">
              <button>Xem chi tiết</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CourseCard;
