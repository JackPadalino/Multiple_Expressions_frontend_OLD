import "./mobileWaveform.css";

// modal imports
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
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
  );
};

export default ModalDiv2;
