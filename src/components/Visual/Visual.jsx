import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import "./visual.css";

import VideoJS from "./VideoJS";

const Visual = () => {
  const { storeVideos } = useSelector((state) => state.music);
  const [renderPlayer, setRenderPlayer] = useState(false);
  const [playingVideo, setPlayingVideo] = useState("");

  // videoJS
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: playingVideo.file,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    // player.on("waiting", () => {
    //   videojs.log("player is waiting");
    // });

    // player.on("dispose", () => {
    //   videojs.log("player will dispose");
    // });
  };

  const handlePlay = (video) => {
    setRenderPlayer(true);
    setPlayingVideo(video);
  };

  return (
    <div className="visualMainContainer">
      <div>
        <h1>Visual</h1>
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
                {video.artists.map((artist) => (
                  <a
                    key={artist.id}
                    href={`#`}
                    style={{ textDecoration: "none", color: "#3366cc" }}
                  >
                    {artist.name}
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
      {/* {renderPlayer && (
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
        </div>
      )} */}
      {renderPlayer && (
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      )}
    </div>
  );
};

export default Visual;
