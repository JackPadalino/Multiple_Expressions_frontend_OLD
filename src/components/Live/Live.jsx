import { useState, useEffect, useRef } from "react";
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
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    const videoPlayer = videoPlayerRef.current;

    // check if IVSPlayer is supported by the browser
    if (IVSPlayer.isPlayerSupported && videoPlayer) {
      const player = IVSPlayer.create();
      player.attachHTMLVideoElement(videoPlayer);
      player.load(import.meta.env.VITE_LIVE_STREAM_LINK);
      player.play();

      // clean up the player when the component unmounts
      return () => {
        player.pause();
      };
    }
  }, []);

  return (
    <>
      <Typography variant="h4">Join us live!</Typography>
      <Box>
        <video ref={videoPlayerRef} id="video-player" playsInline></video>
      </Box>
    </>
  );
};

export default Live;
