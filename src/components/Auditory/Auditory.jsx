import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setDisplayWaveform,
  setWaveformTrack,
} from "../../store/waveformSlice";

import "./auditory.css";

import WaveSurfer from "wavesurfer.js";

const Auditory = () => {
  const dispatch = useDispatch();
  const [mobileView, setMobileView] = useState(false);
  const { storeTracks } = useSelector((state) => state.music);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  const handlePlay = (track) => {
    if (waveformRef.current) {
      if (wavesurferRef.current) {
        // destroy the current instance before creating a new one
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }

      wavesurferRef.current = WaveSurfer.create({
        url: track.file,
        container: waveformRef.current,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(200, 200, 200)",
        height: mobileView ? 50 : 100,
        mediaControls: false,
        barWidth: 2,
        barGap: NaN,
        barRadius: 5,
        barHeight: NaN,
        interact: true,
        dragToSeek: true,
      });

      wavesurferRef.current.on("ready", () => {
        wavesurferRef.current.play();
      });
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1280px)");
    setMobileView(mediaQuery.matches);
  }, []);

  return (
    <div className="auditoryMainContainer">
      <div>
        <h1>Auditory</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {storeTracks.map((track) => (
            <div key={track.id}>
              <h2
                onClick={() => handlePlay(track)}
                style={{ cursor: "pointer" }}
              >
                {track.title}
              </h2>
              <div style={{ display: "flex", gap: "10px" }}>
                {track.users.map((user) => (
                  <a
                    key={user.id}
                    href={`#`}
                    style={{ textDecoration: "none", color: "#3366cc" }}
                  >
                    {user.username}
                  </a>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {track.tags.map((tag) => (
                  <p key={tag.id}>#{tag.title}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="waveformDiv">
        <div ref={waveformRef}></div>
      </div>
    </div>
  );
};

export default Auditory;
