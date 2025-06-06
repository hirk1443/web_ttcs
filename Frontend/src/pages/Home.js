import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Slideshow from "../components/homepage/Slideshow";
import ListCategory from "../components/homepage/ListCategory";
import ListCourses from "../components/homepage/ListCourses";
import { useDispatch, useSelector } from "react-redux";

import summaryApi from "../common";

import BreadcrumbNav from "../components/layout/BreadcrumbNav";

// import ChatWidget from "../components/layout/ChatWidget";

const Home = () => {
  const location = useLocation();
  const user = useSelector(
    (state) => state.user.user,
    (prev, next) => prev === next
  );
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isCourseLoading, setIsCourseLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsCourseLoading(true);
        const courseResponse = await fetch(summaryApi.allCourse.url, {
          method: summaryApi.allCourse.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const courseResult = await courseResponse.json();

        if (courseResult.respCode === "000") {
          setCourses(courseResult.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsCourseLoading(false);
      }
    };
    fetchCourse();
  }, []);

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

  if (user?.roleName === "ROLE_ADMIN") {
    navigate("/admin");
  } else {
    return (
      <>
        <Header />
        <div className="mt-16"></div>
        {location.pathname !== "/profile" && <BreadcrumbNav />}
        <main className="container mx-auto px-4 py-6 bg-gray-50 rounded-lg shadow-sm">
          {location.pathname === "/" && (
            <>
              <Slideshow className="rounded-xl shadow-lg overflow-hidden mb-6" />
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/6 lg:w-1/5 w-full">
                  <div className="sticky top-24">
                    {isCategoriesLoading ? (
                      <div className="flex justify-center items-center h-40">
                        <LoadingOutlined
                          style={{ fontSize: 48, color: "#1890ff" }}
                          spin
                        />
                      </div>
                    ) : (
                      <ListCategory categories={categories} />
                    )}
                  </div>
                </div>
                <div className="md:w-4/6 lg:w-4/5 w-full">
                  {isCourseLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <LoadingOutlined
                        style={{ fontSize: 48, color: "#1890ff" }}
                        spin
                      />
                    </div>
                  ) : (
                    <div className="rounded-md shadow-md p-4 bg-white">
                      <ListCourses course={courses} title={"Tất cả khoá học"} />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          <section className="mt-10 mb-8">
            <Outlet />
            {/* <ChatWidget /> */}
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

export default Home;
