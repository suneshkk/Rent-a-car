import { createBrowserRouter } from "react-router-dom";
import AboutUs from "../pages/AboutUs.jsx";
import CarGallery from "../pages/CarGallery.jsx";
import SignUp from "../pages/SignUp.jsx";
import Login from "../pages/Login.jsx";
import JoinUs from "../pages/JoinUs.jsx";
import RootLayOut from "../layout/RootLayOut.jsx";
import Home from "../pages/Home.jsx";
import Detailes from "../pages/detailes.jsx";
import UserLayout from "../layout/UserLayout.jsx";
import AuthUser from "./protectedRoutes/AuthUser.jsx";
import Profile from "../pages/user/Profile.jsx";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <RootLayOut />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "aboutus",
        element: <AboutUs />
      },
      {
        path: "carGallery",
        element: <CarGallery />
      },
      {
        path: "car-Detailes/:id",
        element: <Detailes />
      },
      {
        path: "signup",
        element: <SignUp />,

      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "joinus",
        element: <JoinUs />
      },
    ],
  },
  {
    path: "user",
    element:
      <AuthUser>
        <UserLayout />
       </AuthUser>,
    children: [
      {
        path: "profile",
        element: <Profile/>
      },
    ],
  },
]);
