import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import VideoJS from "../VideoJS/VideoJS";
// import {
//   setStoreAccessToken,
//   resetStoreAccessToken,
// } from "../../store/usersSlice";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import "./live.css";

// Amazon IVS
import IVSBroadcastClient, {
  Errors,
  BASIC_LANDSCAPE,
} from "amazon-ivs-web-broadcast";

const Live = () => {
  const [isAuthenicated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // check for the presence of an access token in localStorage
    const token = localStorage.getItem("access_token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

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

  //~~~~~~~~~~Amazon IVS~~~~~~~~~~//
  const [channelConfigSelect, setChannelConfigSelect] = useState("");

  // stream configuration choices
  const channelConfigSelectOptions = [
    "Basic: Landscape",
    "Basic: Portrait",
    "Standard: Landscape",
    "Standard: Portrait",
  ];

  const channelConfigs = {
    "Basic: Landscape": IVSBroadcastClient.BASIC_LANDSCAPE,
    "Basic: Portrait": IVSBroadcastClient.BASIC_PORTRAIT,
    "Standard: Landscape": IVSBroadcastClient.STANDARD_LANDSCAPE,
    "Standard: Portrait": IVSBroadcastClient.STANDARD_PORTRAIT,
  };

  const handleStreamConfigChange = (e) => {
    console.log(channelConfigs[e.target.value]);
    setChannelConfigSelect(channelConfigs[e.target.value]);
  };

  // create IVS client
  const createClient = () => {
    const client = IVSBroadcastClient.create({
      // Enter the desired stream configuration
      streamConfig: IVSBroadcastClient.STANDARD_PORTRAIT,
      // Enter the ingest endpoint from the AWS console or CreateChannel API
      ingestEndpoint:
        "rtmps://b45aff1d0b29.global-contribute.live-video.net:443/app/",
    });

    console.log({ client });
  };

  // andle audio/video device enumeration
  async function getDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((d) => d.kind === "videoinput");
    if (!videoDevices.length) {
      console.log("No video devices found");
      // setError("No video devices found.");
    }
    const audioDevices = devices.filter((d) => d.kind === "audioinput");
    if (!audioDevices.length) {
      console.log("No audio devices found");
      // setError("No audio devices found.");
    }
    console.log({ videoDevices, audioDevices });
    return { videoDevices, audioDevices };
  }

  async function handlePermissions() {
    let permissions = {
      audio: false,
      video: false,
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      for (const track of stream.getTracks()) {
        track.stop();
      }
      permissions = { video: true, audio: true };
    } catch (err) {
      permissions = { video: false, audio: false };
      console.error(err.message);
    }
    // If we still don't have permissions after requesting them display the error message
    if (!permissions.video) {
      console.error("Failed to get video permissions.");
    } else if (!permissions.audio) {
      console.error("Failed to get audio permissions.");
    }
  }

  useEffect(() => {
    createClient();
    getDevices();
    handlePermissions();
  }, []);

  return (
    <>
      {!isAuthenicated && (
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      )}
      {isAuthenicated && (
        <>
          {/* stream config select */}
          <label htmlFor="stream-config">Select Channel Config</label>
          <select
            // disabled
            id="stream-config"
            defaultValue=""
            onChange={handleStreamConfigChange}
          >
            <option disabled value="">
              Choose Option
            </option>
            {channelConfigSelectOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* <label htmlFor="video-devices">Select Webcam</label>
          <select id="video-devices">
            <option selected disabled>
              Choose Option
            </option>
          </select>

          <label htmlFor="audio-devices">Select Microphone</label>
          <select id="audio-devices">
            <option selected disabled>
              Choose Option
            </option>
          </select> */}
        </>
      )}
    </>
  );
};

export default Live;
