import { createBrowserRouter } from "react-router-dom";
import AboutUs from "../pages/AboutUs.jsx";
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
import Details from "../pages/Details.jsx";
import UpdateUser from "../pages/user/UpdateUser.jsx";
import AdminSignup from "../pages/admin/AdminSignup.jsx";
import AdminLogin from "../pages/admin/AdminLogin.jsx";
import AdminProfile from "../pages/admin/AdminProfile.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import AdminEdit from "../pages/admin/AdminEdit.jsx";
import Booking from "../pages/user/Booking.jsx";

const router = createBrowserRouter([

  {
    path: "/",
    element: <RootLayOut />,
    errorElement: <ErrorPage />,
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
        path: "car-details/:id",
        element: <Details />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "joinus",
        element: <JoinUs />
      },
      {
        path: "admin sign-up",
        element: <AdminSignup />,
      },
      {
        path: "admin-login",
        element: <AdminLogin />
      },
    ],
  },
  {
    path: "/user",
    element:
      <AuthUser>
        <UserLayout />
      </AuthUser>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "updateUser",
        element: <UpdateUser />
      },
      {
        path:'booking-car',
        element:<Booking/>
      },
      {
        path: "booked-car",
        element: <BookedCar />,
      },
    ],
  },
  {
    path: '/admin',
    element:
    <AdminLayout/>,
    errorElement:<ErrorPage />,
    children: [
      {
        path:"profile",
        element:<AdminProfile/>
      },
      {
        path:"edit",
        element:<AdminEdit/>
      },
    ]
  },

]);
export default router;