import React, { useEffect, useState, useMemo } from "react";
import summaryApi from "../common";
import ListProduct from "../components/homepage/ListCourses";
import { useParams } from "react-router-dom";
// import Filter from "../components/homepage/Filter";
import { LoadingOutlined } from "@ant-design/icons";
import CategoryCard from "../components/layout/CategoryCard";
import ListCourses from "../components/homepage/ListCourses";
import ListCategory from "../components/homepage/ListCategory";

const CategoryPage = () => {
  const [course, setCourse] = useState([]);
  const { categoryName, categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchCategory = async () => {
      try {
        const courseResponse = await fetch(
          summaryApi.getCourseByCategory.url + `${categoryId}`,
          {
            method: summaryApi.getCourseByCategory.method,
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

    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsCategoriesLoading(true);
        const categoriesResponse = await fetch(summaryApi.allCategory.url, {
          method: summaryApi.allCategory.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const categoriesResult = await categoriesResponse.json();

        if (categoriesResult.respCode === "000") {
          setCategories(categoriesResult.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container ">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <LoadingOutlined style={{ fontSize: 48, color: "red" }} spin />
        </div>
      )}

      <div className=" flex flex-col md:flex-row mt-5">
        <div className="md:w-2/6 lg:w-1/5 w-full md:pr-4">
          <div className="sticky top-24 ">
            <ListCategory categories={categories} />
          </div>
        </div>

        {course.length === 0 ? (
          <div className="md:w-4/6 lg:w-4/5 w-full md:pl-4">
            <p className="text-center text-lg font-bold text-gray-500 ">
              No results found
            </p>
          </div>
        ) : (
          <div className="lg:col-start-4 lg:col-span-9 md:col-start-5 md:col-span-8  col-span-12">
            <ListCourses
              course={course}
              title={`Kết quả của các môn với bộ môn ${categoryName}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
