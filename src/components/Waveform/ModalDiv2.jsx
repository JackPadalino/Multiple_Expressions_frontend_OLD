// MUI imports
import { Box, Typography, Avatar, IconButton, Drawer } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./mobileWaveform.css";

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
        <IconButton
          onClick={toggleDrawer("bottom", false)}
          sx={{
            position: "absolute",
            top: 10,
            left: "5%",
            // transform: "translateX(-50%)",
          }}
        >
          <KeyboardArrowDownIcon
            fontSize="large"
            sx={{
              color: "white",
            }}
          />
        </IconButton>
        <img src={waveformTrack.track_photo} className="drawerImg2" />
        {/* <Typography variant="h5">{waveformTrack.title}</Typography> */}
        <Box className="trackArtistsDiv">
          {Object.keys(waveformTrack).length > 0 && (
            <>
              <Typography variant="h4" sx={{ color: "white" }}>
                {waveformTrack.title}
              </Typography>
              {waveformTrack.artists.map((artist) => (
                <Typography
                  variant="h6"
                  key={artist.id}
                  sx={{ color: "white" }}
                >
                  {artist.name}
                </Typography>
              ))}
            </>
          )}
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
    </Drawer>
  );
};

export default ModalDiv2;
