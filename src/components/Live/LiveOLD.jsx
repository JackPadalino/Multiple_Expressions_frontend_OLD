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
  STANDARD_LANDSCAPE,
  BASIC_PORTRAIT,
  STANDARD_PORTRAIT,
} from "amazon-ivs-web-broadcast";

const Live = () => {
  const [isAuthenicated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // check for the presence of an access token in localStorage
  //   const token = localStorage.getItem("access_token");

  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

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
  const previewRef = useRef();

  const [streamConfig, setStreamConfig] = useState(
    IVSBroadcastClient.STANDARD_LANDSCAPE
  );

  const [availableDevices, setAvailableDevices] = useState(null);

  // // stream configuration choices
  // const channelConfigSelectOptions = [
  //   "Basic: Landscape",
  //   "Basic: Portrait",
  //   "Standard: Landscape",
  //   "Standard: Portrait",
  // ];

  // const channelConfigs = {
  //   "Basic: Landscape": IVSBroadcastClient.BASIC_LANDSCAPE,
  //   "Basic: Portrait": IVSBroadcastClient.BASIC_PORTRAIT,
  //   "Standard: Landscape": IVSBroadcastClient.STANDARD_LANDSCAPE,
  //   "Standard: Portrait": IVSBroadcastClient.STANDARD_PORTRAIT,
  // };

  // const handleStreamConfigChange = (e) => {
  //   const stream = channelConfigs[e.target.value];
  //   setStreamConfig(stream);
  // };

  // // changes in stream config need to recreate a new client
  // useEffect(() => {
  //   createClient();
  // }, [streamConfig]);

  const handleSelectedVideoChange = (e) => {
    window.selectedVideoDeviceId = e.target.value;
    createVideoStream();
  };

  const handleSelectedAudioChange = (e) => {
    window.selectedAudioDeviceId = e.target.value;
    createAudioStream();
  };

  const handlePermissions = async () => {
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
      console.error(err.message);
    }
    // If we still don't have permissions after requesting them display the error message
    if (!permissions.video) {
      console.error("Failed to get video permissions.");
    } else if (!permissions.audio) {
      console.error("Failed to get audio permissions.");
    }
  };

  // checking for available decices - "audio/video device enumeration"
  const getAvailableDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((d) => d.kind === "videoinput");
    if (!videoDevices.length) {
      console.log("No video devices found");
    }
    const audioDevices = devices.filter((d) => d.kind === "audioinput");
    if (!audioDevices.length) {
      console.log("No audio devices found");
    }
    setAvailableDevices({ videoDevices, audioDevices });
  };

  // create IVS client
  const createClient = async () => {
    window.broadcastClient = IVSBroadcastClient.create({
      ingestEndpoint:
        "rtmps://b45aff1d0b29.global-contribute.live-video.net:443/app/",
      streamConfig: streamConfig,
      logLevel: IVSBroadcastClient.LOG_LEVEL.DEBUG,
    });

    // if (previewRef.current) {
    //   window.broadcastClient.attachPreview(previewRef.current);
    // }
  };

  const createVideoStream = async () => {
    if (
      window.broadcastClient &&
      window.broadcastClient.getVideoInputDevice("camera1")
    )
      window.broadcastClient.removeVideoInputDevice("camera1");
    window.videoStream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: { exact: window.selectedVideoDeviceId },
        width: {
          ideal: streamConfig.maxResolution.width,
          max: streamConfig.maxResolution.width,
        },
        height: {
          ideal: streamConfig.maxResolution.height,
          max: streamConfig.maxResolution.height,
        },
      },
    });
    if (window.broadcastClient)
      window.broadcastClient.addVideoInputDevice(
        window.videoStream,
        "camera1",
        { index: 0 }
      );
  };

  const createAudioStream = async () => {
    if (
      window.broadcastClient &&
      window.broadcastClient.getAudioInputDevice("mic1")
    )
      window.broadcastClient.removeAudioInputDevice("mic1");
    window.audioStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: window.selectedAudioDeviceId,
      },
    });
    if (window.broadcastClient)
      window.broadcastClient.addAudioInputDevice(window.audioStream, "mic1");
  };

  const startBroadcast = () => {
    window.broadcastClient.startBroadcast(
      import.meta.env.VITE_IVS_STREAM_KEY,
      import.meta.env.VITE_IVS_INGEST_ENDPOINT
    );
  };

  const stopBroadcast = () => {
    window.broadcastClient.stopBroadcast();
  };

  const init = () => {
    getAvailableDevices();
    handlePermissions();
    createClient();

    createVideoStream();
    createAudioStream();

    // // attach preview after all resources are ready
    // if (previewRef.current && window.broadcastClient) {
    //   window.broadcastClient.attachPreview(previewRef.current);
    // }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      init();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      {!isAuthenicated && (
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      )}
      {isAuthenicated && (
        <>
          {/* <label htmlFor="stream-config">Select Channel Config</label>
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
          </select> */}
          {/* condintially rendering the select element if the available devices have been found */}
          {availableDevices && (
            <>
              <label htmlFor="video-devices">Select Webcam</label>
              <select id="video-devices" onChange={handleSelectedVideoChange}>
                <option value="">Choose Option</option>
                {availableDevices.videoDevices.map((device, index) => (
                  <option key={index} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
              </select>

              <label htmlFor="audio-devices">Select Microphone</label>
              <select id="audio-devices" onChange={handleSelectedAudioChange}>
                <option value="">Choose Option</option>
                {availableDevices.audioDevices.map((device, index) => (
                  <option key={index} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
              </select>
            </>
          )}
          <button onClick={() => startBroadcast()}>Start</button>
          <button onClick={() => stopBroadcast()}>Stop</button>
          <section className="container">
            <canvas id="preview" ref={previewRef}></canvas>
          </section>
        </>
      )}
    </>
  );
};

export default Live;
