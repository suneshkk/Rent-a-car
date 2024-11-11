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
import AdminLayout from "../layout/AdminLayout.jsx";
import AdminEdit from "../pages/admin/AdminEdit.jsx";
import Booking from "../pages/user/Booking.jsx";
import CarGallery from "../pages/user/CarGallery.jsx";
import AdminHome from "../pages/admin/AdminHome.jsx";
<<<<<<< HEAD
import CarList from "../pages/admin/controller/CarList.jsx";
import CreateCar from "../pages/admin/controller/CreateCar.jsx";
import EditCar from "../pages/admin/controller/EditCar.jsx";
import DeleteCar from "../pages/admin/controller/DeleteCar.jsx";
import UserList from "../pages/admin/controller/UserList.jsx";
import DeleteUser from "../pages/user/DeleteUser.jsx";
=======
import CreateCar from "../pages/admin/CreateCar.jsx";
import EditCar from "../pages/admin/EditCar.jsx";
import CarList from "../pages/admin/CarList.jsx";
>>>>>>> 3ac04731fefa62e6db524743f9f4788ff7f8e875

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
        path: "car-gallery",
        element: <CarGallery />
      },

      {
        path: "admin-sign-up",
        element: <AdminSignup />,
      },
      {
        path: "car-gallery",
        element: <CarGallery />
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
        path:"delet-user/:id",
        element:<DeleteUser/>
      },
      {
        path: "updateUser/:id",
        element: <UpdateUser />
      },
      {
        path: "car-gallery",
        element: <CarGallery />
      },

      {
        path: 'booking-car',
        element: <Booking />
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
      <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin-home",
        element: <AdminHome/>
      },
<<<<<<< HEAD


=======
>>>>>>> 3ac04731fefa62e6db524743f9f4788ff7f8e875
      {
        path:"car-list",
        element:<CarList/>
      },
      {
        path: "edit",
        element: <AdminEdit />
      },
      {
        path:"create-car",
        element:<CreateCar/>
      },
      {
<<<<<<< HEAD
        path:"edit-car/:id",
        element:<EditCar/>
      },
      {
        path:"car-detail/:id",
        element:<Details/>
      },
      {
        path:"delete-car/:id",
        element:<DeleteCar/>
      },
      {
        path:"user-list",
        element:<UserList/>
      },
=======
        path:"edit-car",
        element:<EditCar/>
      },
>>>>>>> 3ac04731fefa62e6db524743f9f4788ff7f8e875
    ]
  },

]);
export default router;