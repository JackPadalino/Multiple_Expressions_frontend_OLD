import "./mobileWaveform.css";

// modal imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const ModalDiv1 = ({
  waveformTrack,
  wavesurferRef,
  isPlaying,
  toggleDrawer,
}) => {
  return (
    <Box className="modalTriggerDiv">
      <img src={waveformTrack.track_photo} className="modalImg" />
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
  );
};

export default ModalDiv1;
