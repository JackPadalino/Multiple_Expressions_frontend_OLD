import { Link } from "react-router-dom";

// MUI imports
import { Box, Typography, Avatar, IconButton, Drawer } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./mobileWaveform.css";

const WaveformDrawer2 = ({
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
      <Box className="waveformDrawer2Container">
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
        <img src={waveformTrack.track_photo} className="waveformDrawer2Img" />
        <Box className="waveformDrawer2TrackArtistsDiv">
          {Object.keys(waveformTrack).length > 0 && (
            <>
              <Typography variant="h4" sx={{ color: "white" }}>
                {waveformTrack.title}
              </Typography>
              {waveformTrack.artists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  className="waveformDrawer2ArtistLink"
                  onClick={toggleDrawer("bottom", false)}
                >
                  {artist.name}
                </Link>
              ))}
            </>
          )}
        </Box>
        <Box ref={waveformRef} className="waveformRef"></Box>
        <Box className="waveformDrawer2ControlsDiv">
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

export default WaveformDrawer2;
