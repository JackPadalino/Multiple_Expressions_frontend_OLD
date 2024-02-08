import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Chat from "./Chat";
import "./live.css";

const Live = () => {
  const videoPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const theme = createTheme();

  theme.typography.h6 = {
    fontFamily: "Arial",
    textAlign: "center",
    "@media only screen and (max-width: 600px)": {
      fontSize: "15px",
    },
    "@media only screen and (min-width: 600px) and (max-width: 1280px)": {
      fontSize: "25px",
    },
    "@media (min-width:1280px)": {
      fontSize: "25px",
    },
  };

  const initPlayer = () => {
    console.log("Initializing player setup...");
    // check if IVSPlayer is supported by the browser
    if (IVSPlayer.isPlayerSupported && videoPlayerRef.current) {
      const player = IVSPlayer.create();
      player.attachHTMLVideoElement(videoPlayerRef.current);
      player.load(import.meta.env.VITE_LIVE_STREAM_LINK);
      player.play();

      //listen for player events
      player.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
        setIsPlaying(true);
      });

      player.addEventListener(IVSPlayer.PlayerState.ENDED, () => {
        setHasEnded(true);
        setIsPlaying(false);
      });

      // listen for errors (use to auto start)
      player.addEventListener(IVSPlayer.PlayerEventType.ERROR, (err) => {
        if (err.type === "ErrorNotAvailable") setIsPlaying(false);
      });

      // pause the player when the component unmounts
      return () => {
        player.pause();
      };
    }
  };

  useEffect(() => {
    initPlayer();
  }, []);

  return (
    <>
      <Box>
        <ThemeProvider theme={theme}>
          {!isPlaying && !hasEnded && (
            <Typography variant="h6">
              We are not live right now. Check back soon!
            </Typography>
          )}
          {isPlaying && <Typography variant="h6">Live</Typography>}
          {hasEnded && (
            <Typography variant="h6">
              Our live stream has ended. Thanks for coming!
            </Typography>
          )}
          <Box className="playerContainer">
            <video
              ref={videoPlayerRef}
              className="player"
              id="video-player"
              playsInline
              controls
            ></video>
          </Box>
          {!isPlaying && !hasEnded && (
            <Typography variant="h6">
              (If video <span style={{ fontStyle: "italic" }}>should</span> be
              playing try refreshing.)
            </Typography>
          )}
        </ThemeProvider>
      </Box>
      <Box className="chatContainer">
        <Chat />
      </Box>
    </>
  );
};

export default Live;
