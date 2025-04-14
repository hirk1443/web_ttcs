import { useEffect, useState } from "react";
import InPutForm from "../../validateInputForm/InPutForm";
import StyledMenu from "../../layout/StyledMenu";

const CourseForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form className="space-y-6 mr-5" onSubmit={handleSubmit}>
        {/* {errors && <p className="text-sm text-red-500 my-2 ">{errors}</p>} */}
        <InPutForm
          label={"Tên khóa"}
          placeholder={"Tên khóa học"}
          name={"name"}
          required
        />

        <InPutForm
          label={"Tên giáo viên"}
          placeholder={"Tên giáo viên"}
          name={"password"}
          required
        />

        <StyledMenu />

        {/* <button
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
        </button> */}
      </form>
    </>
  );
};

export default CourseForm;
