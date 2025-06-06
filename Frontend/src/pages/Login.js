import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img_login from "../assets/img/login2.jpg";
import Logo from "../components/layout/Logo";
import { LoadingOutlined } from "@ant-design/icons";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { message } from "antd";

import Cookies from "js-cookie";
import Context from "../context";
import EmailInput from "../components/validateInputForm/EmailInput";
import PasswordInput from "../components/validateInputForm/PasswordInput";

const SignIn = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { fetchUserDetails } = useContext(Context);
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setErrors(false);

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const loginResponse = await fetch(summaryApi.signIn.url, {
        method: summaryApi.signIn.method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const loginResult = await loginResponse.json();

      if (loginResult.respCode === "000") {
        navigate("/");
        message.success("Login Successfully !");
        const { accessToken, refreshToken } = loginResult.data;
        Cookies.set("token", accessToken);
        Cookies.set("refreshToken", refreshToken);
        fetchUserDetails();
      } else {
        toast.error("Email hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.log("error Login", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="bg-gray-100 hidden md:w-1/2 md:flex items-center justify-center p-8 relative">
        <img
          src={img_login}
          alt="img-Login"
          className="absolute top-0 left-0 w-full h-full object-cover " // Thêm opacity và object-cover
        />
        {/* <p className="text-lg font-sans mb-4 mt-12 text-center">
          Tất cả khóa học đều miễn phí, bạn có thể đóng góp thêm tài liệu bằng
          cách đăng nhập
        </p> */}
      </div>

      <div className="bg-white md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mt-12 text-center">Đăng nhập</h1>

          <p className="mt-3 mb-14 text-gray-400 text-center text-sm">
            Đăng nhập để có thể bình luận, đăng tài liệu, và hơn thế nữa
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors && <p className="text-sm text-red-500 my-2 ">{errors}</p>}
            <EmailInput
              onEmailChange={handleOnchange}
              setErrors={setEmailError}
            />

            <PasswordInput
              label={"Mật khẩu"}
              placeholder={"Nhập mật khẩu"}
              name={"password"}
              onChange={handleOnchange}
              setErrors={setPasswordError}
            />

            <div className="text-right">
              <div>
                <Link to="/forgot-password">
                  <span className="text-sm text-blue-600 font-medium hover:underline">
                    Não cá vàng?
                  </span>
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoading
                  ? "bg-gray-300 cursor-wait"
                  : passwordError || emailError || errors
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 via-teal-300 to-teal-500 transition-all duration-500 ease-in-out bg-[length:200%_auto] hover:bg-[position:right_center]"
              }`}
              disabled={isLoading || passwordError || emailError || errors}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingOutlined className="text-black animate-spin text-lg" />
                  <span className="ml-2">Signing in...</span>
                </div>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          <div className="flex items-center mt-6 space-x-3 justify-center">
            <span className="text-center text-gray-500">
              Chưa có tài khoản?
            </span>
            <Link to="/sign-up">
              <span className="text-blue-600 hover:underline">
                Đăng ký ngay
              </span>
              .
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
