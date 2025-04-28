import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";

import OtpAuthentication from "../pages/OtpAuthentication";
import ChangePassword from "../pages/ChangePassword";
import PrivateRoute from "./private.route";
import Profile from "../pages/Profile";
import AdminHome from "../pages/AdminHome";

import UsersContent from "../components/adminpage/user/UsersContent";
import NotFound from "../pages/NotFound404";
import SearchCourse from "../pages/SearchCourse";
import CategoryPage from "../pages/CategoryPage";
import CourseContent from "../components/adminpage/course/CourseContent";

import DetailsPage from "../pages/DetailsPage";
import ContentPage from "../pages/ContentPage";

import Player from "../pages/Player";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <App />
      </>
    ),
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "/search",
            element: <SearchCourse />,
          },
          {
            path: "profile",
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },

          {
            path: "*",
            element: <NotFound />,
          },
          {
            path: "/:categoryName/:categoryId",
            element: <CategoryPage />,
          },
          {
            path: "/course/:courseId",
            element: <DetailsPage />,
          },
          {
            path: "/details/:detailsId",
            element: <ContentPage />,
            children: [
              {
                path: "player/:contentId",
                element: <Player />,
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/otp-auth",
        element: <OtpAuthentication />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <CourseContent />,
          },

          {
            path: "users",
            element: <UsersContent />,
          },
          {
            path: "course",
            element: <CourseContent />,
          },

          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default router;
