import { useEffect, useState } from "react";
import fetchWithAuth from "../../../helps/fetchWithAuth";
import summaryApi from "../../../common";
import CourseTable from "./CourseTable";
import DocumentTable from "./DetailsTable";
import { Tabs } from "antd";
import ContentTable from "./ContentTable";

const { TabPane } = Tabs;
const CourseContent = () => {
  const [courseList, setCourseList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [detailsList, setDetailsList] = useState([]);
  const [contentList, setContentList] = useState([]);

  const fetchAllCourse = async () => {
    try {
      const response = await fetch(summaryApi.allCourse.url, {
        method: summaryApi.allCourse.method,
      });
      const dataResponse = await response.json();
      if (dataResponse.respCode === "000") {
        setCourseList(dataResponse.data);
      } else {
        console.log("Lấy dữ liệu không thành công", dataResponse);
      }
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };

  const fetchAllDetails = async () => {
    try {
      const response = await fetchWithAuth(summaryApi.getAlLDetails.url, {
        method: summaryApi.getAlLDetails.method,
      });

      const dataResponse = await response.json();
      if (dataResponse.respCode == "000") {
        setDetailsList(dataResponse.data);
      } else {
        console.log("Lấy dữ liệu không thành công", dataResponse);
      }
    } catch (e) {
      console.log("Lỗi khi gọi API:", e);
    }
  };

  const fetchAllContent = async () => {
    try {
      const response = await fetchWithAuth(summaryApi.getAllContent.url, {
        method: summaryApi.getAllContent.method,
      });

      const dataResponse = await response.json();
      if (dataResponse.respCode == "000") {
        setContentList(dataResponse.data);
      } else {
        console.log("Lấy dữ liệu không thành công", dataResponse);
      }
    } catch (e) {
      console.log("Lỗi khi gọi API:", e);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch(summaryApi.allCategory.url, {
        method: summaryApi.allCategory.method,
      });
      const dataResponse = await response.json();
      if (dataResponse.respCode === "000") {
        setCategoryList(dataResponse.data);
      } else {
        console.log("Lấy dữ liệu không thành công", dataResponse);
      }
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchAllCourse();
    fetchAllDetails();
    fetchAllCategories();
    fetchAllContent();
  }, []);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Khóa học" key="1">
        <CourseTable
          courseList={courseList}
          setCourseList={setCourseList}
          categoryList={categoryList}
          fetchAllCourse={fetchAllCourse}
        />
      </TabPane>
      <TabPane tab="Chương liên quan" key="2">
        <DocumentTable
          detailsList={detailsList}
          courseList={courseList}
          fetchAllDetails={fetchAllDetails}
          setDetailsList={setDetailsList}
        />
      </TabPane>
      <TabPane tab="Nội dung" key="3">
        <ContentTable
          courseList={courseList}
          contentList={contentList}
          fetchAllContents={fetchAllContent}
        />
      </TabPane>
    </Tabs>
  );
};

export default CourseContent;
