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

  const handlePlayPauseClick = (event) => {
    // stop the play/pause click event from propogating up the DOM tree
    // to prevent container click event and triggering 'toggleDrawer'
    // function
    event.stopPropagation();
    wavesurferRef.current.playPause();
  };

  return (
    <Box
      className="waveformDrawer1Container"
      onClick={toggleDrawer("bottom", true)}
    >
      <img src={waveformTrack.track_photo} className="waveformDrawer1Img" />
      <Typography
        variant="h6"
        sx={{ color: "#EAA128" }}
      >
        {waveformTrack.title}
      </Typography>
      <IconButton onClick={handlePlayPauseClick}>
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
