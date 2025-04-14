import React, { useEffect, useState, useMemo } from "react";
import summaryApi from "../common";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import ListCourses from "../components/homepage/ListCourses";
import ListCategory from "../components/homepage/ListCategory";
import CourseCard from "../components/layout/CourseCard";
import DetailsCard from "../components/layout/DetailsCard";
import ListDetails from "../components/homepage/ListDetails";

const DetailsPage = () => {
  const [details, setDetails] = useState([]);
  const [course, setCourse] = useState([]);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchDetails = async () => {
      try {
        const courseResponse = await fetch(
          summaryApi.getDetailsByCourse.url + `/${courseId}`,
          {
            method: summaryApi.getDetailsByCourse.method,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dataResult = await courseResponse.json();
        if (dataResult.respCode === "000") {
          setDetails(dataResult.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [courseId]);

  useEffect(() => {
    setLoading(true);
    const fetchCourse = async () => {
      try {
        const courseResponse = await fetch(
          summaryApi.getCourseById.url + `/${courseId}`,
          {
            method: summaryApi.getCourseById.method,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dataResult = await courseResponse.json();
        if (dataResult.respCode === "000") {
          setCourse(dataResult.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return (
    <div className="container ">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <LoadingOutlined style={{ fontSize: 48, color: "red" }} spin />
        </div>
      )}

      <div className="flex flex-col md:flex-row mt-5">
        {/* Left: Course Card */}
        <div className="md:w-2/6 lg:w-1/5 w-full md:pr-4">
          <div className="sticky top-24">
            <CourseCard course={course} showDetails={false} />
          </div>
        </div>

        {/* Right: Details Card or message */}
        <div className="md:w-4/6 lg:w-4/5 w-full md:pl-4">
          {course.length === 0 ? (
            <p className="text-center text-lg font-bold text-gray-500">
              No results found
            </p>
          ) : (
            <>
              <ListDetails details={details} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
