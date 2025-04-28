import { useEffect, useState } from "react";
import fetchWithAuth from "../../../helps/fetchWithAuth";
import summaryApi from "../../../common";

import { Tabs } from "antd";
import DocumentTable from "./AllDocumentTable";

const { TabPane } = Tabs;
const DocumentContent = () => {
  const [documents, setDocuments] = useState([]);
  const [pendingDocuments, setPendingDocuments] = useState([]);

  const fetchAllDocuments = async () => {
    try {
      const response = await fetchWithAuth(summaryApi.getAllDocument.url, {
        method: summaryApi.getAllDocument.method,
      });
      const dataResponse = await response.json();
      if (dataResponse.respCode === "000") {
        setDocuments(dataResponse.data);
      } else {
        console.log("Lấy dữ liệu không thành công", dataResponse);
      }
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };

  const fetchAllPendingDocuments = async () => {
    try {
      const response = await fetchWithAuth(
        summaryApi.getDocumentByStatus.url + `?filter=PENDING`,
        {
          method: summaryApi.getDocumentByStatus.method,
        }
      );
      const dataResponse = await response.json();
      if (dataResponse.respCode === "000") {
        setPendingDocuments(dataResponse.data);
      } else {
        console.log("Lấy dữ liệu không thành công", dataResponse);
      }
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchAllDocuments();
    fetchAllPendingDocuments();
  }, []);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Tất cả tài liệu" key="1">
        <DocumentTable
          documents={documents}
          setDocuments={setDocuments}
        ></DocumentTable>
      </TabPane>
      <TabPane tab="Đang chờ duyệt" key="2">
        <DocumentTable
          documents={pendingDocuments}
          setDocuments={setPendingDocuments}
        ></DocumentTable>
      </TabPane>
    </Tabs>
  );
};

export default DocumentContent;
