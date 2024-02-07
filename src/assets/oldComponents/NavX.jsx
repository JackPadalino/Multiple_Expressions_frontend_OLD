import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
// import "./nav.css";

const Nav = () => {
  return (
    <Box className="navContainer">
      <Box>
        <Link to="/" className="navLink">
          Multiple Expressions
        </Link>
        <Link to="/auditory" className="navLink">
          Auditory
        </Link>
        <Link to="/visual" className="navLink">
          Visual
        </Link>
        <Link to="/live" className="navLink">
          Live
        </Link>
      </Box>
      <Box>
        <Link to="/admin" className="navLink">
          Admin
        </Link>
      </Box>
    </Box>
  );
};

export default Nav;
