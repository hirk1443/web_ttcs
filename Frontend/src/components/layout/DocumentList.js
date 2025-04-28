import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { Pagination } from "antd";

import DocumentCard from "../layout/DocumentCard";

const DocumentList = ({ document: initial, title, showStatus }) => {
  const titleRef = useRef();
  const [document, setDocument] = useState(initial || []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const documentList = document;

  const currentDocs = useMemo(() => {
    const indexLast = currentPage * itemsPerPage;
    const indexFirst = indexLast - itemsPerPage;
    return documentList.slice(indexFirst, indexLast);
  }, [currentPage, itemsPerPage, documentList]);

  useEffect(() => {
    setDocument(initial);
  }, [initial]);

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
            {`${title} ( ${documentList.length} )`}
          </h2>
        </div>
      )}
      {documentList.length === 0 ? (
        <div className="text-center text-lg font-bold text-gray-500 mt-5">
          No results found
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 lg:gap-6 md:gap-3 gap-2 mt-5 ">
          {currentDocs.map((document, index) => (
            <DocumentCard
              document={document}
              showStatus={showStatus}
            ></DocumentCard>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={documentList.length}
          onChange={handlePageChange}
          pageSize={itemsPerPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default DocumentList;
