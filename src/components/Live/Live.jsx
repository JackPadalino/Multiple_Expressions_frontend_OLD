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
  const [client, setClient] = useState({});
  const [streamConfig, setStreamConfig] = useState(
    IVSBroadcastClient.BASIC_LANDSCAPE
  );
  const [permissions, setPermissions] = useState({});
  const [devices, setDevices] = useState({});
  // const [ingestEndpoint, setIngestEndpoint] = useState("");
  const [streamKey, setStreamKey] = useState("");

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
    const stream = channelConfigs[e.target.value];
    setStreamConfig(stream);
  };

  // const handleIngestEndpointChange = (e) => {
  //   setIngestEndpoint(e.target.value);
  // };

  const handleStreamKeyChange = (e) => {
    setStreamKey(e.target.value);
  };

  // create IVS client
  const createClient = () => {
    const client = IVSBroadcastClient.create({
      // Enter the desired stream configuration
      streamConfig: streamConfig,
      // Enter the ingest endpoint from the AWS console or CreateChannel API
      ingestEndpoint:
        "rtmps://b45aff1d0b29.global-contribute.live-video.net:443/app/",
    });
    setClient(client);
  };

  // update the client whenever the stream config settings are changed
  useEffect(() => {
    createClient();
  }, [streamConfig]);

  // checking for available decices - "audio/video device enumeration"
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
    setDevices({ videoDevices, audioDevices });
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
      setPermissions(permissions);
    } catch (err) {
      console.error(err.message);
    }
    // If we still don't have permissions after requesting them display the error message
    if (!permissions.video) {
      console.error("Failed to get video permissions.");
    } else if (!permissions.audio) {
      console.error("Failed to get audio permissions.");
    }
  }

  const init = () => {
    createClient();
    getDevices();
    handlePermissions();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {!isAuthenicated && (
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      )}
      {isAuthenicated && (
        <>
          <label htmlFor="stream-config">Select Channel Config</label>
          <select
            id="stream-config"
            defaultValue={streamConfig}
            onChange={handleStreamConfigChange}
          >
            <option value="">Choose Option</option>
            {channelConfigSelectOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* <section className="container">
            <label htmlFor="ingest-endpoint">Ingest Endpoint</label>
            <input
              type="text"
              id="ingest-endpoint"
              value={ingestEndpoint}
              onChange={handleIngestEndpointChange}
            />
          </section> */}
          <section className="container">
            <label htmlFor="stream-key">Stream Key</label>
            <input
              type="text"
              id="stream-key"
              value={streamKey}
              onChange={handleStreamKeyChange}
            />
          </section>
          {/* preview component */}
          <section className="container">
            <canvas id="preview"></canvas>
          </section>
          {/* video device select */}
          <label htmlFor="video-devices">Select Webcam</label>
          <select id="video-devices">
            <option value="">Choose Option</option>
            {devices.videoDevices.map((device, index) => (
              <option key={index} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>

          <label htmlFor="audio-devices">Select Microphone</label>
          <select id="audio-devices">
            <option value="">Choose Option</option>
            {devices.audioDevices.map((device, index) => (
              <option key={index} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
};

export default Live;
