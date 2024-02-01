import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Live = () => {
  return (
    <>
      <h1>Live</h1>
      <Link to={`${import.meta.env.VITE_LIVE_STREAM_LINK}`}>Join live</Link>
    </>
  );
};

export default Live;
