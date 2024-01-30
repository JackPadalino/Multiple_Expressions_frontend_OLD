import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import { setStoreUsers } from "../../store/userSlice";
import { setStoreTracks, setStoreVideos } from "../../store/musicSlice";
import { setMobileView } from "../../store/mobileViewSlice";
import { Home, Visual, Auditory, Live, Waveform } from "..";
import "./app.css";

// modal imports
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

function App() {
  const dispatch = useDispatch();
  const { waveformTrack } = useSelector((state) => state.waveform);
  const { mobileView } = useSelector((state) => state.mobileView);
  const [loading, setLoading] = useState(true);
  const [trackModalState, setTrackModalState] = useState(false); // modal state

  const fetchData = () => {
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    axios
      .get(`${url}/api/users/all`)
      .then((userData) => {
        dispatch(setStoreUsers(userData.data));
        return axios.get(`${url}/api/music/tracks/all`);
      })
      .then((trackData) => {
        dispatch(setStoreTracks(trackData.data));
        return axios.get(`${url}/api/music/videos/all`);
      })
      .then((videoData) => {
        dispatch(setStoreVideos(videoData.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  // modal toggle function
  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setTrackModalState(!trackModalState);
  };

  // modal content
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // check for mobile view - send state up to redux store
  // to be used by other components like waveform
  const checkMobileView = () => {
    const mediaQuery = window.matchMedia("(max-width: 1280px)");
    dispatch(setMobileView(mediaQuery.matches));
  };

  useEffect(() => {
    fetchData();
    checkMobileView();
  }, []);

  // const location = useLocation();
  // const urlParams = new URLSearchParams(location.search);

  // Get the value of the 'success' query parameter
  // const successQueryParam = urlParams.get("success");

  if (loading) return <p>Loading...</p>;
  return (
    <div className="appContainer">
      {/* <Router /> */}
      <Routes>
        {/* <Route
        path="/checkout"
        element={<Checkout successQueryParam={successQueryParam} />}
      /> */}
        <Route path="/" element={<Home />} />
        <Route path="/visual" element={<Visual />} />
        <Route path="/auditory" element={<Auditory />} />
        <Route path="/live" element={<Live />} />
      </Routes>
      {mobileView ? (
        <>
          {Object.keys(waveformTrack).length > 0 && (
            <Box
              onClick={toggleDrawer("bottom", true)}
              sx={{
                position: "fixed",
                bottom: "0",
                width: "100%",
                backgroundColor: "black",
              }}
            >
              <h1 style={{ textAlign: "center", color: "white" }}>
                {waveformTrack.title}
              </h1>
            </Box>
          )}
          <Drawer
            anchor={"bottom"}
            open={trackModalState}
            onClose={toggleDrawer("bottom", false)}
            // variant="temporary"
            ModalProps={{
              keepMounted: true,
            }}
          >
            {/* {list("bottom")} */}
            <Waveform />
          </Drawer>
        </>
      ) : (
        Object.keys(waveformTrack).length > 0 && <Waveform />
      )}
    </div>
  );
}

export default App;
