import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import "./nav.css";

const Nav = () => {
  const { storeBroadcasting } = useSelector((state) => state.live);

  return (
    <Box className="navContainer">
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
        {storeBroadcasting ? "Live (streaming now)" : "Live"}
      </Link>
    </Box>
  );
};

export default Nav;
