import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import WaveSurfer from "wavesurfer.js";

// MUI imports
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import Replay10OutlinedIcon from "@mui/icons-material/Replay10Outlined";
import Forward10OutlinedIcon from "@mui/icons-material/Forward10Outlined";

import "./waveform.css";

const Waveform = () => {
  const { mobileView } = useSelector((state) => state.mobileView);
  const { waveformTrack } = useSelector((state) => state.waveform);

  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  // function to format seconds into 00:00 format
  const formatTime = (seconds) =>
    [seconds / 60, seconds % 60]
      .map((v) => `0${Math.floor(v)}`.slice(-2))
      .join(":");

  const playSong = (track) => {
    if (waveformRef.current) {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }

      wavesurferRef.current = WaveSurfer.create({
        url: track.file,
        container: waveformRef.current,
        waveColor: "rgb(232, 214, 184)",
        progressColor: "rgb(234, 162, 42)",
        height: 75,
        mediaControls: false,
        barWidth: 2,
        barGap: NaN,
        barRadius: 5,
        barHeight: NaN,
        interact: true,
        dragToSeek: true,
        backend: "MediaElement",
        normalize: true,
        // for now we are pre-generating a random array of peaks - not ideal!
        peaks: Array.from({ length: 1000 }, () => Math.random()),
      });

      wavesurferRef.current.on("ready", () => {
        const seconds = wavesurferRef.current.getDuration();
        setTrackDuration(formatTime(seconds));
        wavesurferRef.current.play();
      });

      wavesurferRef.current.on("audioprocess", () => {
        const seconds = wavesurferRef.current.getCurrentTime();
        setCurrentTime(formatTime(seconds));
      });

      wavesurferRef.current.on("play", () => {
        setIsPlaying(true);
      });

      wavesurferRef.current.on("pause", () => {
        setIsPlaying(false);
      });

      // we can log the actual peaks data once the audio file has been
      // decoded
      // wavesurferRef.current.on("decode", () => {
      //   const peaks = wavesurferRef.current.exportPeaks();
      //   console.log(JSON.stringify(peaks));
      // });
    }
  };

  useEffect(() => {
    playSong(waveformTrack);
  }, [waveformTrack]);

  return (
    <>
      {Object.keys(waveformTrack).length > 0 && (
        <Box className="waveformMain">
          <Box className="trackinfoDiv">
            <img src={waveformTrack.track_photo} className="trackImg" />
            <Box>
              <Typography className="trackTitle">
                {waveformTrack.title}
              </Typography>
              {Object.keys(waveformTrack).length > 0 &&
                waveformTrack.artists.map((artist) => (
                  <Typography key={artist.id} sx={{ color: "white" }}>
                    {artist.name}
                  </Typography>
                ))}
            </Box>
          </Box>
          <Box ref={waveformRef} className="waveformDiv"></Box>
          <div className="controlsDiv">
            <Typography sx={{ color: "white" }}>{currentTime}</Typography>
            {/* <Replay10OutlinedIcon
              fontSize="large"
              sx={{
                color: "white",
              }}
            /> */}
            <IconButton onClick={() => wavesurferRef.current.playPause()}>
              {isPlaying ? (
                <Avatar
                  sx={{
                    bgcolor: "black",
                    border: "2px solid white",
                    width: 50,
                    height: 50,
                  }}
                >
                  <PauseIcon
                    fontSize="large"
                    sx={{
                      color: "white",
                    }}
                  />
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    bgcolor: "white",
                    border: "2px solid white",
                    width: 50,
                    height: 50,
                  }}
                >
                  <PlayArrowIcon
                    fontSize="large"
                    sx={{
                      color: "black",
                    }}
                  />
                </Avatar>
              )}
            </IconButton>
            {/* <Forward10OutlinedIcon
              fontSize="large"
              sx={{
                color: "white",
              }}
            /> */}
            <Typography sx={{ color: "white" }}>{trackDuration}</Typography>
          </div>
        </Box>
      )}
    </>
  );
};

export default Waveform;
