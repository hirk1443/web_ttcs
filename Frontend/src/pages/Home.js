import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Slideshow from "../components/homepage/Slideshow";
import ListCategory from "../components/homepage/ListCategory";
import ListProduct from "../components/homepage/ListProduct";
import { useDispatch, useSelector } from "react-redux";

import summaryApi from "../common";

import BreadcrumbNav from "../components/layout/BreadcrumbNav";

import ChatWidget from "../components/layout/ChatWidget";

const Home = () => {
  const location = useLocation();
  const user = useSelector(
    (state) => state.user.user,
    (prev, next) => prev === next
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isCourseLoading, setIsProductsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsProductsLoading(true);
        const productResponse = await fetch(summaryApi.allCourse.url, {
          method: summaryApi.allCourse.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const productResult = await productResponse.json();

        if (productResult.respCode === "000") {
          setProducts(productResult.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsProductsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (user?.roleName === "ROLE_ADMIN") {
    navigate("/admin");
  } else {
    return (
      <>
        <Header />
        <div className="mt-32"></div>
        {location.pathname !== "/profile" && <BreadcrumbNav />}
        <main className="container mx-auto ">
          {location.pathname === "/" && (
            <>
              <Slideshow />
              <div className="flex flex-col md:flex-row mt-5">
                <div className="md:w-2/6 lg:w-1/5 w-full md:pr-4">
                  <div className="sticky top-24">
                    {isCategoriesLoading ? (
                      <div className="flex justify-center items-center h-screen">
                        <LoadingOutlined
                          style={{ fontSize: 48, color: "red" }}
                          spin
                        />
                      </div>
                    ) : (
                      <ListCategory categories={categories} />
                    )}
                  </div>
                </div>
                <div className="md:w-4/6 lg:w-4/5 w-full md:pl-4">
                  {isCourseLoading ? (
                    <div className="flex justify-center items-center h-screen">
                      <LoadingOutlined
                        style={{ fontSize: 48, color: "red" }}
                        spin
                      />
                    </div>
                  ) : (
                    <ListProduct course={products} title={"All products"} />
                  )}
                </div>
              </div>
            </>
          )}
          <section className=" mb-8">
            <Outlet />
            <ChatWidget />
          </section>
        </main>
      </>
    );
  }
};

export default Home;
