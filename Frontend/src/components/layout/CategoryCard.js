import React from "react";
import image1 from "../../assets/img/empty.jpg";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/${category.name}/${category.id}`);
  };

  return (
    <div
      onClick={handleCategoryClick}
      className="flex items-center overflow-hidden p-2 hover:bg-gray-200 rounded "
    >
      <div className=" lg:px-4 md:px-2 px-4 py-2">
        <div className=" font-medium lg:text-base  text-sm ">
          {category.name}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
