import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import "./mobileWaveform.css";

// modal imports
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const MobileWaveform = () => {
  const { mobileView } = useSelector((state) => state.mobileView);
  const { waveformTrack } = useSelector((state) => state.waveform);

  const [trackModalState, setTrackModalState] = useState(false); // modal state
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [trackUsers, setTrackUsers] = useState([]);

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
        waveColor: "rgb(200, 200, 200)",
        progressColor: "rgb(200, 0, 200)",
        height: mobileView ? 50 : 100,
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
        setTrackUsers(waveformTrack.users);
      });

      wavesurferRef.current.on("play", () => {
        setIsPlaying(true);
      });

      wavesurferRef.current.on("pause", () => {
        setIsPlaying(false);
      });
    }
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

  useEffect(() => {
    playSong(waveformTrack);
  }, [waveformTrack]);

  return (
    <>
      {Object.keys(waveformTrack).length > 0 && (
        <Box className="modalTriggerDiv">
          <img
            src={waveformTrack.track_photo}
            style={{ width: "auto", height: "40px" }}
          />
          <Typography variant="h6" onClick={toggleDrawer("bottom", true)}>
            {waveformTrack.title}
          </Typography>
          <IconButton onClick={() => wavesurferRef.current.playPause()}>
            {isPlaying ? (
              <PauseIcon
                fontSize="large"
                sx={{
                  color: "white",
                }}
              />
            ) : (
              <PlayArrowIcon
                fontSize="large"
                sx={{
                  color: "white",
                }}
              />
            )}
          </IconButton>
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
        <Box className="drawerDiv">
          <img
            src={waveformTrack.track_photo}
            style={{ width: "auto", height: "100px" }}
          />
          <Typography variant="h5">{waveformTrack.title}</Typography>
          <Box className="trackUsersDiv">
            {Object.keys(waveformTrack).length > 0 &&
              waveformTrack.users.map((user) => (
                <Typography variant="h6" key={user.id} sx={{ color: "white" }}>
                  {user.username}
                </Typography>
              ))}
          </Box>
          <Box ref={waveformRef} className="waveformRef"></Box>
          <Box className="controlsDiv">
            <Typography variant="h6">{currentTime}</Typography>
            <IconButton onClick={() => wavesurferRef.current.playPause()}>
              {isPlaying ? (
                <PauseIcon
                  fontSize="large"
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                <PlayArrowIcon
                  fontSize="large"
                  sx={{
                    color: "white",
                  }}
                />
              )}
            </IconButton>
            <Typography variant="h6">{trackDuration}</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileWaveform;
