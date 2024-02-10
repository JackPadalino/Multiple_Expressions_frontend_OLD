import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import "./nav.css";

const Nav = () => {
  return (
    <Box className="navMainContainer">
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
  );
};

export default Nav;
