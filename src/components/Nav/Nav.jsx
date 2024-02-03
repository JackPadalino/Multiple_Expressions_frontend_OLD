import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import "./nav.css";

const Nav = () => {
  return (
    <Box className="navContainer">
      <Link to="/">Multiple Expressions</Link>
      <Link to="/auditory">Auditory</Link>
      <Link to="/visual">Visual</Link>
      <Link to="/live">Live</Link>
    </Box>
  );
};

export default Nav;
