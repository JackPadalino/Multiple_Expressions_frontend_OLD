import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setDisplayWaveform,
  setWaveformTrack,
} from "../../store/waveformSlice";

import "./auditory.css";

const Auditory = () => {
  const dispatch = useDispatch();
  const { storeTracks } = useSelector((state) => state.music);
  // const [renderPlayer, setRenderPlayer] = useState(false);
  // const [playingVideo, setPlayingVideo] = useState("");

  const handlePlay = () => {
    dispatch(setDisplayWaveform(true));
  };

  return (
    <div className="auditoryMainContainer">
      <div>
        <h1>Auditory</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {storeTracks.map((track) => (
            <div key={track.id}>
              {/* <img
              src={video.video_photo}
              style={{ width: "250px", height: "175px" }}
            /> */}
              {/* <p>{video.upload_date}</p> */}
              <h2 onClick={() => handlePlay()} style={{ cursor: "pointer" }}>
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
    </div>
  );
};

export default Auditory;
