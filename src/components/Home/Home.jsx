// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import "./home.css";

// const Home = () => {
//   const imgRef = useRef(null);

//   // using useEffect to create the fade-in animation when component loads
//   useEffect(() => {
//     const handleImageLoad = () => {
//       imgRef.current.classList.add("imgLoaded");
//     };

//     if (imgRef.current) {
//       imgRef.current.addEventListener("load", handleImageLoad);
//     }

//     return () => {
//       if (imgRef.current) {
//         imgRef.current.removeEventListener("load", handleImageLoad);
//       }
//     };
//   }, []);

//   return (
//     <div className="homeMainContainer">
//       {/* <Link to="/auditory"> */}
//       <img
//         src={`https://${
//           import.meta.env.VITE_AWS_S3_BUCKET
//         }.s3.amazonaws.com/site_photos/Home Img Slice 1.jpg`}
//         ref={imgRef}
//         id="homeImg"
//         className="homeImg"
//         alt="Home Image"
//       />
//       <img
//         src={`https://${
//           import.meta.env.VITE_AWS_S3_BUCKET
//         }.s3.amazonaws.com/site_photos/Home Img Slice 2.jpg`}
//         ref={imgRef}
//         id="homeImg"
//         className="homeImg"
//         alt="Home Image"
//       />
//       {/* </Link> */}
//       <h2 className="homeTitle">Multiple Expressions</h2>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const imgRef3 = useRef(null);
  const imgRef4 = useRef(null);

  // using useEffect to create the fade-in animation when component loads
  useEffect(() => {
    const handleImageLoad = (imgRef) => {
      imgRef.current.classList.add("imgLoaded");
    };

    if (imgRef1.current) {
      imgRef1.current.addEventListener("load", () => handleImageLoad(imgRef1));
    }

    if (imgRef2.current) {
      imgRef2.current.addEventListener("load", () => handleImageLoad(imgRef2));
    }

    if (imgRef3.current) {
      imgRef3.current.addEventListener("load", () => handleImageLoad(imgRef3));
    }
    if (imgRef4.current) {
      imgRef4.current.addEventListener("load", () => handleImageLoad(imgRef4));
    }

    return () => {
      if (imgRef1.current) {
        imgRef1.current.removeEventListener("load", () =>
          handleImageLoad(imgRef1)
        );
      }
      if (imgRef2.current) {
        imgRef2.current.removeEventListener("load", () =>
          handleImageLoad(imgRef2)
        );
      }
      if (imgRef3.current) {
        imgRef3.current.removeEventListener("load", () =>
          handleImageLoad(imgRef3)
        );
      }
      if (imgRef4.current) {
        imgRef4.current.removeEventListener("load", () =>
          handleImageLoad(imgRef4)
        );
      }
    };
  }, []);

  return (
    <div className="homeMainContainer">
      {/* <Link to="/auditory"> */}
      <img
        src={`https://${
          import.meta.env.VITE_AWS_S3_BUCKET
        }.s3.amazonaws.com/site_photos/Home Img Slice 1.jpg`}
        ref={imgRef1}
        id="homeImg1"
        className="homeImg"
        alt="Home Image"
      />
      <img
        src={`https://${
          import.meta.env.VITE_AWS_S3_BUCKET
        }.s3.amazonaws.com/site_photos/Home Img Slice 2.jpg`}
        ref={imgRef2}
        id="homeImg2"
        className="homeImg"
        alt="Home Image"
      />
      <img
        src={`https://${
          import.meta.env.VITE_AWS_S3_BUCKET
        }.s3.amazonaws.com/site_photos/Home Img Slice 3.jpg`}
        ref={imgRef3}
        id="homeImg3"
        className="homeImg"
        alt="Home Image"
      />
      <img
        src={`https://${
          import.meta.env.VITE_AWS_S3_BUCKET
        }.s3.amazonaws.com/site_photos/Home Img Slice 4.jpg`}
        ref={imgRef4}
        id="homeImg4"
        className="homeImg"
        alt="Home Image"
      />
      {/* </Link> */}
      <h2 className="homeTitle">Multiple Expressions</h2>
    </div>
  );
};

export default Home;
