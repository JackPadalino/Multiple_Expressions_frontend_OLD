import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const imgRef = useRef(null);

  // using useEffect to create the fade-in animation when component loads
  useEffect(() => {
    const handleImageLoad = () => {
      imgRef.current.classList.add("imgLoaded");
    };

    if (imgRef.current) {
      imgRef.current.addEventListener("load", handleImageLoad);
    }

    return () => {
      if (imgRef.current) {
        imgRef.current.removeEventListener("load", handleImageLoad);
      }
    };
  }, []);

  return (
    <div className="homeMainContainer">
      <Link to="/auditory">
        <img
          src={`https://${
            import.meta.env.VITE_AWS_S3_BUCKET
          }.s3.amazonaws.com/site_photos/logo.jpeg`}
          ref={imgRef}
          id="homeImg"
          className="homeImg"
          alt="Home Image"
        />
      </Link>
      <h2 className="homeTitle">Multiple Expressions</h2>
    </div>
  );
};

export default Home;
