import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactPlayer from "react-player";
import VideoJS from "../VideoJS/VideoJS";
// import {
//   setStoreAccessToken,
//   resetStoreAccessToken,
// } from "../../store/usersSlice";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import "./live.css";

const Live = () => {
  // user login
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isAuthenicated, setIsAuthenticated] = useState(false);
  // const { storeAccessToken } = useSelector((state) => state.users);

  const onCredentialsChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let url;
      if (import.meta.env.VITE_DEV_MODE === "true") {
        url = import.meta.env.VITE_DEV_URL;
      } else {
        url = import.meta.env.VITE_PROD_URL;
      }

      const response = await axios.post(`${url}/api/users/token`, credentials);
      if (
        response.status === 200 ||
        response.status === 204 ||
        response.status === 205
      ) {
        window.localStorage.clear();
        window.localStorage.setItem("access_token", response.data.access);
        window.localStorage.setItem("refresh_token", response.data.refresh);
        // dispatchEvent(setStoreAccessToken(response.data.access));
        setIsAuthenticated(true);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Handle error
      if (error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }

      // setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      let url;
      if (import.meta.env.VITE_DEV_MODE === "true") {
        url = import.meta.env.VITE_DEV_URL;
      } else {
        url = import.meta.env.VITE_PROD_URL;
      }

      const token = window.localStorage.getItem("refresh_token");

      const response = await axios.post(`${url}/api/users/logout`, {
        refresh_token: token,
      });

      if (
        response.status === 200 ||
        response.status === 204 ||
        response.status === 205
      ) {
        window.localStorage.clear();
        // dispatchEvent(resetStoreAccessToken());
        setIsAuthenticated(false);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        setIsAuthenticated(false);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      // setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // check for the presence of an access token in localStorage
    const token = localStorage.getItem("access_token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // videoJS
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: import.meta.env.VITE_LIVE_STREAM_LINK,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    // player.on("waiting", () => {
    //   videojs.log("player is waiting");
    // });

    // player.on("dispose", () => {
    //   videojs.log("player will dispose");
    // });
  };

  return (
    <>
      <h1>Live</h1>
      {/* <Link to={import.meta.env.VITE_LIVE_STREAM_LINK}>Join live</Link> */}
      {/* <div className="playerContainer">
        <div className="playerWrapper">
          <ReactPlayer
            className="react-player"
            config={{ file: { forceHLS: true } }} //forcing our browser to use hls.js library to play steaming video
            url={import.meta.env.VITE_LIVE_STREAM_LINK}
            controls={true}
            muted={false}
            volume={1}
            width="100%"
            height="100%"
            playsinline={true} //disables 'auto full screen' on mobile - consider using for mobile!
            onError={(e) => console.error("Error playing video:", e)}
            onPlay={() => console.log("Video is playing")}
            onPause={() => console.log("Video is paused")}
            onEnded={() => console.log("Video has ended")}
          />
        </div>
      </div> */}
      {!isAuthenicated && (
        <>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          <Container component="main" maxWidth="xs">
            <Box
              className="mainBox"
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleLogin}
            >
              <TextField
                //margin="normal"
                required
                fullWidth
                onChange={onCredentialsChange}
                id="username"
                label="Username"
                name="username"
                //autoComplete="username"
                value={credentials.username}
                //autoFocus
              />
              <TextField
                //margin="normal"
                required
                fullWidth
                onChange={onCredentialsChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                value={credentials.password}
                //autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained" size="large">
                Login
              </Button>
            </Box>
          </Container>
        </>
      )}
      {isAuthenicated && (
        <Button onClick={() => handleLogout()} variant="contained" size="large">
          Logout
        </Button>
      )}
    </>
  );
};

export default Live;
