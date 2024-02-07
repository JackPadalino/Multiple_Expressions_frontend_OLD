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
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

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

      // clean up the player when the component unmounts
      return () => {
        player.pause();
      };
    }
  };

  useEffect(() => {
    initPlayer();
  }, []);

  return (
    <Box>
      {!isPlaying && !hasEnded && (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          We are not live right now. Check back soon!
        </Typography>
      )}
      {isPlaying && (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Live
        </Typography>
      )}
      {hasEnded && (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
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
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        (If video <span style={{ fontStyle: "italic" }}>should</span> be
        playing try refreshing the page.)
      </Typography>
    </Box>
  );
};

export default Live;
