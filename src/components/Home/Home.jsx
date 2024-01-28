import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <>
      <h1>Multiple Expressions</h1>
      <Link to="/auditory">Auditory</Link>
      <Link to="/visual">Visual</Link>
      <Link to="/live">Live</Link>
    </>
  );
};

export default Home;
