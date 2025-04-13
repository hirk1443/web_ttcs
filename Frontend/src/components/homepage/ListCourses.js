import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { Pagination } from "antd";
import CourseCard from "../layout/CourseCard";

const ListCourses = ({ course: initialProducts, title }) => {
  const titleRef = useRef();
  const [course, setProducts] = useState(initialProducts || []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const courseList = course;

  const currentCourses = useMemo(() => {
    const indexLast = currentPage * itemsPerPage;
    const indexFirst = indexLast - itemsPerPage;
    return courseList.slice(indexFirst, indexLast);
  }, [currentPage, itemsPerPage, courseList]);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (titleRef.current) {
      const elementPosition =
        titleRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container bg-white shadow-md p-3 mx-auto mt-10 ">
      {title && (
        <div>
          <h2 ref={titleRef} className="font-bold text-base ">
            {`${title} ( ${courseList.length} )`}
          </h2>
        </div>
      )}
      {courseList.length === 0 ? (
        <div className="text-center text-lg font-bold text-gray-500 mt-5">
          No results found
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 lg:gap-6 md:gap-3 gap-2 mt-5 ">
          {currentCourses.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={courseList.length}
          onChange={handlePageChange}
          pageSize={itemsPerPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ListCourses;
