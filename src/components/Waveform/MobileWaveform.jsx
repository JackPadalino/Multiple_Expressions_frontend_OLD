import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { Box } from "@mui/material";

import MobileWaveformDrawer1 from "./MobileWaveformDrawer1";
import MobileWaveformDrawer2 from "./MobileWaveformDrawer2";
import "./mobileWaveform.css";

const MobileWaveform = () => {
  const [trackModalState, setTrackModalState] = useState(false); // modal state
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  const { waveformTrack } = useSelector((state) => state.waveform);

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
        height: 35,
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

  const handlePlayPauseClick = (event) => {
    // stop the play/pause click event from propogating up the DOM tree
    // to prevent container click event and triggering 'toggleDrawer'
    // function for the mobile player
    event.stopPropagation();
    wavesurferRef.current.playPause();
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

  const handleJumpBack = () => {
    wavesurferRef.current.skip(-10);
  };

  const handleJumpForward = () => {
    wavesurferRef.current.skip(10);
  };

  useEffect(() => {
    playSong(waveformTrack);
  }, [waveformTrack]);

  return (
    <Box className="mobileWaveformContainer">
      {Object.keys(waveformTrack).length > 0 && (
        <MobileWaveformDrawer1
          waveformTrack={waveformTrack}
          isPlaying={isPlaying}
          toggleDrawer={toggleDrawer}
          handlePlayPauseClick={handlePlayPauseClick}
        />
      )}
      <MobileWaveformDrawer2
        waveformTrack={waveformTrack}
        isPlaying={isPlaying}
        toggleDrawer={toggleDrawer}
        handlePlayPauseClick={handlePlayPauseClick}
        handleJumpBack={handleJumpBack}
        handleJumpForward={handleJumpForward}
        trackModalState={trackModalState}
        waveformRef={waveformRef}
        currentTime={currentTime}
        trackDuration={trackDuration}
      />
    </Box>
  );
};

export default MobileWaveform;
