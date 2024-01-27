import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Exhibits } from ".";
// import Exhibits from "./Exhibits/Exhibits";

const Router = () => {
  //   const location = useLocation();
  //   const urlParams = new URLSearchParams(location.search);

  // Get the value of the 'success' query parameter
  //   const successQueryParam = urlParams.get("success");

  return (
    <Routes>
      {/* <Route
        path="/checkout"
        element={<Checkout successQueryParam={successQueryParam} />}
      /> */}
      <Route path="/" element={<Home />} />
      <Route path="/exhibits" element={<Exhibits />} />
    </Routes>
  );
};

export default Router;
