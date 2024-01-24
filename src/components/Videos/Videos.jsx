import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import ReactPlayer from "react-player";

import "./videos.css";

const Videos = () => {
  const { storeVideos } = useSelector((state) => state.music);
  const [renderPlayer, setRenderPlayer] = useState(false);
  const [playingVideo, setPlayingVideo] = useState("");

  const handlePlay = (video) => {
    setRenderPlayer(true);
    setPlayingVideo(video);
  };

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <div>
        <h1>This is the Videos component</h1>
        {storeVideos.map((video) => (
          <div key={video.id}>
            <h3 onClick={() => handlePlay(video)} style={{ cursor: "pointer" }}>
              {video.title} - {video.upload_date}
            </h3>
            <div style={{ display: "flex", gap: "10px" }}>
              {video.tags.map((tag) => (
                <p key={tag.id}>#{tag.title}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      {renderPlayer && (
        <div>
          <ReactPlayer
            url={`http://localhost:8000${playingVideo.file}`}
            // url="https://www.youtube.com/watch?v=HkKr8HG3qUA"
            controls={true}
            muted={false}
            volume={1}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            {playingVideo.tags.map((tag) => (
              <p key={tag.id}>#{tag.title}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
