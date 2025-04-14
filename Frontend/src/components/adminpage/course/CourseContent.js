import { useEffect, useState } from "react";
import fetchWithAuth from "../../../helps/fetchWithAuth";
import summaryApi from "../../../common";
import CourseTable from "./CourseTable";

const UsersContent = () => {
  const [courseList, setUserList] = useState([]);

  useEffect(() => {
    const fetchAllCourse = async () => {
      try {
        const response = await fetch(summaryApi.allCourse.url, {
          method: summaryApi.allCourse.method,
        });
        const dataResponse = await response.json();
        if (dataResponse.respCode === "000") {
          setUserList(dataResponse.data);
        } else {
          console.log("Lấy dữ liệu không thành công", dataResponse);
        }
      } catch (error) {
        console.log("Lỗi khi gọi API:", error);
      }
    };

    fetchAllCourse();
  }, []);
  return (
    <>
      <CourseTable courseList={courseList} setCourseList={setUserList} />
    </>
  );
};

export default UsersContent;
