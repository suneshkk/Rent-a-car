import { createBrowserRouter } from "react-router-dom";
import AboutUs from "../pages/AboutUs.jsx";
import CarGallery from "../pages/CarGallery.jsx";
import SignUp from "../pages/SignUp.jsx";
import Login from "../pages/Login.jsx";
import JoinUs from "../pages/JoinUs.jsx";
import RootLayOut from "../layout/RootLayOut.jsx";
import Home from "../pages/Home.jsx";


export const router = createBrowserRouter([

  {
    path: "/",
    element: <RootLayOut />,
    children: [
      {
        path:"",
        element:<Home/>,
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
    ]
  }
]);
