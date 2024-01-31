import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import "./mobileWaveform.css";

// modal imports
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const MobileWaveform = () => {
  const { mobileView } = useSelector((state) => state.mobileView);
  const { waveformTrack } = useSelector((state) => state.waveform);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [trackModalState, setTrackModalState] = useState(false); // modal state

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
        wavesurferRef.current.play();
      });

      wavesurferRef.current.on("play", () => {
        return null;
      });

      // we can log the actual peaks data once the audio file has been
      // decoded
      // wavesurferRef.current.on("decode", () => {
      //   const peaks = wavesurferRef.current.exportPeaks();
      //   console.log(JSON.stringify(peaks));
      // });
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
        <Box className="modalTriggerDiv" onClick={toggleDrawer("bottom", true)}>
          <Typography variant="h5">{waveformTrack.title}</Typography>
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
          <Typography variant="h5">{waveformTrack.title}</Typography>
          <Box ref={waveformRef}></Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileWaveform;
