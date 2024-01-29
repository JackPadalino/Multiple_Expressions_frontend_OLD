import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import "./waveform.css";

const Waveform = () => {
  const { mobileView } = useSelector((state) => state.mobileView);
  const { waveformTrack } = useSelector((state) => state.waveform);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

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
      });

      wavesurferRef.current.on("ready", () => {
        wavesurferRef.current.play();
      });

      wavesurferRef.current.on("play", () => {
        return null;
      });
    }
  };

  useEffect(() => {
    playSong(waveformTrack);
  }, [waveformTrack]);

  return (
    <div className="waveformDiv">
      <div ref={waveformRef}></div>
    </div>
  );
};

export default Waveform;
