import { createBrowserRouter } from "react-router-dom";
import AboutUs from "../pages/AboutUs.jsx";
import CarGallery from "../pages/CarGallery.jsx";
import Login from "../pages/Login.jsx";
import JoinUs from "../pages/JoinUs.jsx";
import RootLayOut from "../layout/RootLayOut.jsx";
import Home from "../pages/Home.jsx";
import UserLayout from "../layout/UserLayout.jsx";
import AuthUser from "./protectedRoutes/AuthUser.jsx";
import Profile from "../pages/user/Profile.jsx";
import BookedCar from "../pages/user/RentalCart.jsx";
import SignUp from "../pages/user/SignUp.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import Details from "../pages/user/Details.jsx";

const router = createBrowserRouter([

  {
    path: "/",
    element: <RootLayOut />,
    errorElement:<ErrorPage/>,
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
        path:"details",
        element:<Details/>
      },      {
        path:"sign-up",
        element:<SignUp/>
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
       errorElement:<ErrorPage/>,
    children: [
      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path:"booked-car",
        element:<BookedCar/>,
      },
      {
        path: "carGallery",
        element: <CarGallery />
      },
    ],
  },
]);
export  default router;