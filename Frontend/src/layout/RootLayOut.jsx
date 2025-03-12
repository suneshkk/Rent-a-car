import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function RootLayOut() {
  const location = useLocation();
  return (
    <div>
      {location.pathname == "/" && <Header />}

      <Outlet />
      
      {location.pathname == "/" && <Footer/>}

      
    </div>
  );
}

export default RootLayOut;
