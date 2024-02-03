import "./mobileWaveform.css";

// MUI imports
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Drawer,
  SwipeableDrawer,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const ModalDiv2 = ({
  trackModalState,
  toggleDrawer,
  waveformTrack,
  waveformRef,
  wavesurferRef,
  currentTime,
  isPlaying,
  trackDuration,
}) => {
  return (
    <SwipeableDrawer
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
          style={{ width: "auto", height: "125px" }}
        />
        <Typography variant="h5">{waveformTrack.title}</Typography>
        <Box className="trackUsersDiv">
          {Object.keys(waveformTrack).length > 0 &&
            waveformTrack.artists.map((artist) => (
              <Typography variant="h6" key={artist.id} sx={{ color: "white" }}>
                {artist.name}
              </Typography>
            ))}
        </Box>
        <Box ref={waveformRef} className="waveformRef"></Box>
        <Box className="controlsDiv">
          <Typography variant="h6">{currentTime}</Typography>
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
          <Typography variant="h6">{trackDuration}</Typography>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default ModalDiv2;
