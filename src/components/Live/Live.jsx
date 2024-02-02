import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import "./live.css";

import VideoJS from "../VideoJS/VideoJS";

const Live = () => {
  // videoJS
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: import.meta.env.VITE_LIVE_STREAM_LINK,
        type: "application/x-mpegURL",
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

  return (
    <>
      <h1>Live</h1>
      {/* <Link to={import.meta.env.VITE_LIVE_STREAM_LINK}>Join live</Link> */}
      {/* <div className="playerContainer">
        <div className="playerWrapper">
          <ReactPlayer
            className="react-player"
            config={{ file: { forceHLS: true } }} //forcing our browser to use hls.js library to play steaming video
            url={import.meta.env.VITE_LIVE_STREAM_LINK}
            controls={true}
            muted={false}
            volume={1}
            width="100%"
            height="100%"
            playsinline={true} //disables 'auto full screen' on mobile - consider using for mobile!
            onError={(e) => console.error("Error playing video:", e)}
            onPlay={() => console.log("Video is playing")}
            onPause={() => console.log("Video is paused")}
            onEnded={() => console.log("Video has ended")}
          />
        </div>
      </div> */}
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
};

export default Live;
