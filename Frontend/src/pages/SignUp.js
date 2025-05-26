import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img_login from "../assets/img/img-login.png";
import Logo from "../components/layout/Logo";

import summaryApi from "../common";
import Context from "../context";

import Cookies from "js-cookie";

import { toast } from "react-toastify";
import PasswordInput from "../components/validateInputForm/PasswordInput";
import EmailInput from "../components/validateInputForm/EmailInput";
import { LoadingOutlined } from "@ant-design/icons";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { fetchUserDetails } = useContext(Context);

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setError(false);
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      setIsLoading(true);
      try {
        const signUpResponse = await fetch(summaryApi.signUP.url, {
          method: summaryApi.signUP.method,
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const signUpResult = await signUpResponse.json();

        if (signUpResult.respCode === "000") {
          toast.success("Sign Up  Successfully !");

          // auto login
          const loginResponse = await fetch(summaryApi.signIn.url, {
            method: summaryApi.signIn.method,
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const loginResult = await loginResponse.json();
          if (loginResult.respCode === "000") {
            navigate("/");
            const { accessToken, refreshToken } = loginResult.data;
            Cookies.set("token", accessToken);
            Cookies.set("refreshToken", refreshToken);
            fetchUserDetails();
          }
        } else {
          toast.error(signUpResult.data, {
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.log("Error SignUp", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Password and Confirm Password not match", {
        autoClose: 1000,
      });
      setError("Password and Confirm Password not match");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="bg-gray-100 hidden md:w-1/2 md:flex items-center justify-center p-8 relative">
        <img
          src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/472709908_897151605955308_4165085234155109734_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeFsugFwpXQl5MSj3Js-QoT9vgMWmnqHVcW-AxaaeodVxeK4bV8chZYg6D3qMAonDQs5qVWYyJo9T58JLfMs5uJz&_nc_ohc=JnOx2NNhthQQ7kNvwHd-RpN&_nc_oc=AdltZd66egWWXoZqjQguQR2m342JpTSUZBufw22j5RLULzESSQBLl-42dwG92WRyn_6mtmTw4OWGlKr7NboBgyBz&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=g-4-e9jla4siuolGv03WgA&oh=00_AfIUlwQYHAXPqJlSrcWHceq_iQaTXkgdTCZtdD8HJ3uSbA&oe=682631AA"
          alt="img-Login"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60" // Thêm opacity và object-cover
        />
        {/* <p className="text-lg font-sans mb-4 mt-12 text-center">
          Tất cả khóa học đều miễn phí, bạn có thể đóng góp thêm tài liệu bằng
          cách đăng nhập
        </p> */}
      </div>

      <div className="bg-white md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div>
            <h1 className="text-3xl font-bold mt-12 text-center ">Đăng ký</h1>

            <p className="mt-3 mb-14 text-gray-400 text-center text-sm">
              Đóng góp và đánh tài liệu cho cộng đồng ngay bây giờ
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
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

            <PasswordInput
              label={"Xác nhận mật khẩu"}
              placeholder={"Nhập lại mật khẩu"}
              name={"confirmPassword"}
              onChange={handleOnchange}
              setErrors={setPasswordError}
            />
            {error && <p className="text-sm text-red-500 my-2">{error}</p>}

            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoading
                  ? "bg-gray-300 cursor-wait"
                  : passwordError || emailError
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 via-teal-300 to-teal-500 transition-all duration-500 ease-in-out bg-[length:200%_auto] hover:bg-[position:right_center]"
              }`}
              disabled={isLoading || passwordError || emailError}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingOutlined className="text-black animate-spin text-lg" />
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="flex items-center mt-5 space-x-3 justify-center">
            <span className=" text-center text-gray-500">
              Đã có tài khoản?{" "}
            </span>
            <Link to="/login">
              <span className="text-blue-600 hover:underline">Đăng nhập</span>.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
