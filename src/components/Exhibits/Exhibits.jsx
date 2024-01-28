import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import ReactPlayer from "react-player";
import "./exhibits.css";

const Exhibits = () => {
  const { storeVideos } = useSelector((state) => state.music);
  const [renderPlayer, setRenderPlayer] = useState(false);
  const [playingVideo, setPlayingVideo] = useState("");

  const handlePlay = (video) => {
    setRenderPlayer(true);
    setPlayingVideo(video);
  };

  return (
    <div className="exhibitsMainContainer">
      <div>
        <h1>Exhibits</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {storeVideos.map((video) => (
            <div key={video.id}>
              {/* <img
              src={video.video_photo}
              style={{ width: "250px", height: "175px" }}
            /> */}
              {/* <p>{video.upload_date}</p> */}
              <h2
                onClick={() => handlePlay(video)}
                style={{ cursor: "pointer" }}
              >
                {video.title}
              </h2>
              <div style={{ display: "flex", gap: "10px" }}>
                {video.users.map((user) => (
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
                {video.tags.map((tag) => (
                  <p key={tag.id}>#{tag.title}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {renderPlayer && (
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
              playsinline={true} //disables 'auto full screen' on mobile - consider using for mobile!
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

export default Exhibits;
