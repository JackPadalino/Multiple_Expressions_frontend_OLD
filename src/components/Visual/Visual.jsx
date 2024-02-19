import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import { Box } from "@mui/material";
import "./visual.css";

import VideoJS from "../VideoJS/VideoJS";

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
    <Box className="visualMainContainer">
      <p>Visual expressions coming soon.</p>
      {/* <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {storeVideos.map((video) => (
            <Box key={video.id}>
              <h2
                onClick={() => handlePlay(video)}
                style={{ cursor: "pointer" }}
              >
                {video.title}
              </h2>
              <Box style={{ display: "flex", gap: "10px" }}>
                {video.artists.map((artist) => (
                  <a
                    key={artist.id}
                    href={`#`}
                    style={{ textDecoration: "none", color: "#3366cc" }}
                  >
                    {artist.name}
                  </a>
                ))}
              </Box>
              <Box style={{ display: "flex", gap: "10px" }}>
                {video.tags.map((tag) => (
                  <p key={tag.id}>#{tag.title}</p>
                ))}
              </Box>
            </Box>
          ))}
        </Box> */}
      {/* {renderPlayer && (
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      )} */}
    </Box>
  );
};

export default Visual;
