import "./mobileWaveform.css";

// modal imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const WaveformDrawer1 = ({
  waveformTrack,
  wavesurferRef,
  isPlaying,
  toggleDrawer,
}) => {
  return (
    <Box className="waveformDrawer1Container">
      <img src={waveformTrack.track_photo} className="waveformDrawer1Img" />
      <Typography
        variant="h6"
        sx={{ color: "#EAA128" }}
        onClick={toggleDrawer("bottom", true)}
      >
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

export default WaveformDrawer1;
