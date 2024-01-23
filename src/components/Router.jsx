import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Videos } from ".";

const Router = () => {
  //   const location = useLocation();
  //   const urlParams = new URLSearchParams(location.search);

  // Get the value of the 'success' query parameter
  //   const successQueryParam = urlParams.get("success");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/videos" element={<Videos />} />
      {/* Pass the successQueryParam as a prop to the Success component */}
      {/* <Route
        path="/checkout"
        element={<Checkout successQueryParam={successQueryParam} />}
      /> */}
    </Routes>
  );
};

export default Router;
