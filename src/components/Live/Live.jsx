import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import "./live.css";

const Live = () => {
  return (
    <>
      <h1>Live</h1>
      {/* <Link to={import.meta.env.VITE_LIVE_STREAM_LINK}>Join live</Link> */}
      <div className="playerContainer">
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
      </div>
    </>
  );
};

export default Live;
