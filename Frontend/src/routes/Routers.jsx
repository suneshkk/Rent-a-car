import { createBrowserRouter } from "react-router-dom";
import AboutUs from "../pages/AboutUs.jsx";
import Login from "../pages/Login.jsx";
import RootLayOut from "../layout/RootLayOut.jsx";
import Home from "../pages/Home.jsx";
import UserLayout from "../layout/UserLayout.jsx";
import AuthUser from "./protectedRoutes/AuthUser.jsx";
import Profile from "../pages/user/Profile.jsx";
import BookedCar from "../pages/user/RentalCart.jsx";
import SignUp from "../pages/user/SignUp.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import UpdateUser from "../pages/user/UpdateUser.jsx";
import AdminSignup from "../pages/admin/AdminSignup.jsx";
import AdminLogin from "../pages/admin/AdminLogin.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import AdminEdit from "../pages/admin/AdminEdit.jsx";
import Booking from "../pages/user/Booking.jsx";
import CarGallery from "../pages/user/CarGallery.jsx";
import AdminHome from "../pages/admin/AdminHome.jsx";
import CarList from "../pages/admin/controller/CarList.jsx";
import CreateCar from "../pages/admin/controller/CreateCar.jsx";
import EditCar from "../pages/admin/controller/EditCar.jsx";
import DeleteCar from "../pages/admin/controller/DeleteCar.jsx";
import DeleteUser from "../pages/user/DeleteUser.jsx";
import Payment from "../pages/user/Payment.jsx";
import DeleteBooking from "../pages/user/DeleteBooking.jsx"
import PaymentSuccess from "../pages/user/SuccessPage.jsx";
import AddReview from "../pages/user/AddReview.jsx";
import AuthAdmin from "./protectedRoutes/AuthAdmin.jsx";
import UserHome from "../pages/user/UserHome.jsx";
import DeleteAccount from "../pages/admin/DeleteAccount.jsx";

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
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "login",
        element: <Login />
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
        path:"home",
        element:<UserHome/>
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "add-review/:id",
        element: <AddReview />
      },
      {
        path: "success",
        element: <PaymentSuccess />
      },
      {
        path: "delet-user/:id",
        element: <DeleteUser />
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
        path: "delete-booking/:id",
        element: <DeleteBooking />

      },
      {
        path: 'book-now/:id',
        element: <Booking />
      },
      {
        path: 'payment',
        element: <Payment />
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
    <AuthAdmin>
      <AdminLayout />,
    </AuthAdmin>,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "admin-home",
        element: <AdminHome />
      },
     {path:"delete-account/:id",
      element:<DeleteAccount/>
     },
      {
        path: "car-list",
        element: <CarList />
      },
      {
        path: "edit",
        element: <AdminEdit />
      },
      {
        path: "create-car",
        element: <CreateCar />
      },
      {
        path: "edit-car/:id",
        element: <EditCar />
      },
      // {
      //   path: "car-detail/:id",
      //   element: <Details />
      // },
      {
        path: "delete-car/:id",
        element: <DeleteCar />
      },
    ]
  },

]);
export default router;