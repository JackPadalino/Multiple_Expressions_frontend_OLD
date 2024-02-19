import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import "./home.css";

const Home = () => {
  const imgRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const loadAndAnimateImage = (index) => {
    if (index < imgRefs.length) {
      const currentImgRef = imgRefs[index];
      const nextIndex = index + 1;

      if (currentImgRef.current) {
        currentImgRef.current.src = currentImgRef.current.dataset.src;
        currentImgRef.current.addEventListener("load", () => {
          currentImgRef.current.classList.add("imgLoaded");
          setTimeout(() => {
            loadAndAnimateImage(nextIndex);
          }, 1000); // adjust the delay for the animation
        });
      }
    }
  };

  useEffect(() => {
    loadAndAnimateImage(0);
  }, []);

  return (
    <Box className="homeMainContainer">
      <Link to="/auditory" className="imgLink">
        <img
          data-src={`https://${
            import.meta.env.VITE_AWS_S3_BUCKET
          }.s3.amazonaws.com/site_photos/Home Img Slice 1.jpg`}
          ref={imgRefs[0]}
          className="homeImg"
          alt="Home Image"
        />
        <img
          data-src={`https://${
            import.meta.env.VITE_AWS_S3_BUCKET
          }.s3.amazonaws.com/site_photos/Home Img Slice 2.jpg`}
          ref={imgRefs[1]}
          className="homeImg"
          alt="Home Image"
        />
        <img
          data-src={`https://${
            import.meta.env.VITE_AWS_S3_BUCKET
          }.s3.amazonaws.com/site_photos/Home Img Slice 3.jpg`}
          ref={imgRefs[2]}
          className="homeImg"
          alt="Home Image"
        />
        <img
          data-src={`https://${
            import.meta.env.VITE_AWS_S3_BUCKET
          }.s3.amazonaws.com/site_photos/Home Img Slice 4.jpg`}
          ref={imgRefs[3]}
          className="homeImg"
          alt="Home Image"
        />
      </Link>
    </Box>
  );
};

export default Home;
