import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";

// import "./live.css";

const Live = () => {
  const [isAuthenicated, setIsAuthenticated] = useState(false);

  // ~~~~~~~~~~ AWS IVS BROADCAST ~~~~~~~~~~ //
  const [client, setClient] = useState(null);
  const [streamConfig, setStreamConfig] = useState(
    IVSBroadcastClient.STANDARD_LANDSCAPE
  );
  const [permissions, setPermissions] = useState(null);
  const [availableDevices, setAvailableDevices] = useState(null);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);

  // handle device permissions
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
  };

  // checking for available decices - "audio/video device enumeration"
  const getAvailableDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((d) => d.kind === "videoinput");
    // window.videoDevices = videoDevices;
    if (!videoDevices.length) {
      console.log("No video devices found");
    }
    const audioDevices = devices.filter((d) => d.kind === "audioinput");
    // window.audioDevices = audioDevices;
    if (!audioDevices.length) {
      console.log("No audio devices found");
    }
    setAvailableDevices({ videoDevices, audioDevices });
  };

  const handleSelectedVideoChange = (e) => {
    setSelectedVideoDevice(e.target.value);
  };

  const createVideoStream = async () => {
    if (client && client.getVideoInputDevice("camera1"))
      client.removeVideoInputDevice("camera1");
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: { exact: selectedVideoDevice },
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
    if (client)
      client.addVideoInputDevice(videoStream, "camera1", { index: 0 });
  };

  useEffect(() => {
    createVideoStream();
  }, [selectedVideoDevice]);

  const handleSelectedAudioChange = (e) => {
    setSelectedAudioDevice(e.target.value);
  };

  const createAudioStream = async () => {
    if (client && client.getAudioInputDevice("mic1"))
      client.removeAudioInputDevice("mic1");
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: selectedAudioDevice,
      },
    });
    if (client) client.addAudioInputDevice(audioStream, "mic1");
  };

  useEffect(() => {
    createAudioStream();
  }, [selectedAudioDevice]);

  // create IVS client
  const createClient = async () => {
    const ivsClient = IVSBroadcastClient.create({
      streamConfig: streamConfig,
      ingestEndpoint: import.meta.env.VITE_IVS_INGEST_ENDPOINT,
    });
    setClient(ivsClient);
  };

  const startBroadcast = () => {
    if (
      client &&
      availableDevices &&
      permissions &&
      selectedVideoDevice &&
      selectedAudioDevice
    ) {
      console.log("Starting broadcast...");
      client.startBroadcast(
        import.meta.env.VITE_IVS_STREAM_KEY,
        import.meta.env.VITE_IVS_INGEST_ENDPOINT
      );
    }
  };

  const stopBroadcast = () => {
    console.log("Stopping broadcast...");
    client.stopBroadcast();
  };

  const initBroadcast = () => {
    console.log("Initializing broadcast setup...");
    handlePermissions();
    getAvailableDevices();
    createClient();
    createVideoStream();
    createAudioStream();
  };

  // ~~~~~~~~~~ AWS IVS PLAYER ~~~~~~~~~~ //
  const videoPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const initPlayer = () => {
    console.log("Initializing player setup...");
    // check if IVSPlayer is supported by the browser
    if (IVSPlayer.isPlayerSupported && videoPlayerRef.current) {
      const player = IVSPlayer.create();
      player.attachHTMLVideoElement(videoPlayerRef.current);
      player.load(import.meta.env.VITE_LIVE_STREAM_LINK);
      player.play();

      //listen for player events
      player.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
        setIsPlaying(true);
      });

      player.addEventListener(IVSPlayer.PlayerState.ENDED, () => {
        setHasEnded(true);
        setIsPlaying(false);
      });

      // listen for errors (use to auto start)
      player.addEventListener(IVSPlayer.PlayerEventType.ERROR, (err) => {
        if (err.type === "ErrorNotAvailable") setIsPlaying(false);
      });

      // clean up the player when the component unmounts
      return () => {
        player.pause();
      };
    }
  };

  useEffect(() => {
    // checking if an admin is logged in before setting up player/broadcast
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      initBroadcast();
    } else {
      initPlayer();
    }
  }, []);

  return (
    <>
      {!isAuthenicated ? (
        <Box>
          {!isPlaying && !hasEnded && (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              We are not live right now. Check back soon!
            </Typography>
          )}
          {isPlaying && (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Live
            </Typography>
          )}
          {hasEnded && (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Our live stream has ended. Thanks for coming!
            </Typography>
          )}
          <Box className="playerContainer">
            <video
              ref={videoPlayerRef}
              className="player"
              id="video-player"
              playsInline
              controls
            ></video>
          </Box>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            (If video <span style={{ fontStyle: "italic" }}>should</span> be
            playing try refreshing the page.)
          </Typography>
        </Box>
      ) : (
        <Box>
          {permissions && availableDevices && (
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
              <button onClick={() => startBroadcast()}>Start</button>
              <button onClick={() => stopBroadcast()}>Stop</button>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Live;
