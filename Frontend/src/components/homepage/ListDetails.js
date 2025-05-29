import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { Pagination } from "antd";
import DetailsCard from "../layout/DetailsCard";

const ListDetails = ({ details: initialProducts, title, length }) => {
  const titleRef = useRef();
  const [details, setDetails] = useState(initialProducts || []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const detailsList = details;

  const currentDetails = useMemo(() => {
    const indexLast = currentPage * itemsPerPage;
    const indexFirst = indexLast - itemsPerPage;
    return detailsList.slice(indexFirst, indexLast);
  }, [currentPage, itemsPerPage, detailsList]);

  useEffect(() => {
    setDetails(initialProducts);
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
            {`${title} ( ${detailsList.length} )`}
          </h2>
        </div>
      )}
      {detailsList.length === 0 ? (
        <div className="text-center text-lg font-bold text-gray-500 mt-5">
          No results found
        </div>
      ) : (
        <div className="flex flex-col space-y-4 mt-5">
          <p className="text-left text-lg font-bold ">
            {`Danh sách chương (${detailsList.length})`}
          </p>
          {currentDetails.map((details, index) => (
            <DetailsCard details={details} key={index} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={detailsList.length}
          onChange={handlePageChange}
          pageSize={itemsPerPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ListDetails;
