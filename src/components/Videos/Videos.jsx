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
    <div className="videoMainContainer">
      <div>
        <h1>This is the Videos component</h1>
        {storeVideos.map((video) => (
          <div key={video.id}>
            <h3 onClick={() => handlePlay(video)} style={{ cursor: "pointer" }}>
              {/* {video.title} - {video.upload_date} */}
              {video.title}
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
        // <div style={{ border: "1px solid red", width: "50%" }}>
        <div className="playerContainer">
          <div className="playerWrapper">
            <ReactPlayer
              className="reactPlayer"
              config={{ file: { attributes: { controlsList: "nodownload" } } }}
              // url={`http://localhost:8000${playingVideo.file}`} // for using files served from localhost
              url={playingVideo.file} // for using S3 bucket files
              controls={true}
              muted={false}
              volume={1}
              width="100%"
              height="100%"
              playsinline={true}
            />
          </div>
          {/* <div style={{ display: "flex", gap: "10px" }}>
            {playingVideo.tags.map((tag) => (
              <p key={tag.id}>#{tag.title}</p>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Videos;
