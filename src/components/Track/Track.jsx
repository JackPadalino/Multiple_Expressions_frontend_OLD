import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { setWaveformTrack } from "../../store/waveformSlice";
import "./track.css";

const Track = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [track, setTrack] = useState({});
  const [loading, setLoading] = useState(true);

  const formatDate = (track) => {
    const dateObject = new Date(track.upload_date);
    const formattedDate = dateObject.toISOString().split("T")[0];
    return {
      ...track,
      upload_date: formattedDate,
    };
  };

  const fetchTrackData = async () => {
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    try {
      const response = await axios.get(`${url}/api/music/tracks/${id}`);
      const updatedTrack = formatDate(response.data);
      setTrack(updatedTrack);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const handlePlay = (track) => {
    dispatch(setWaveformTrack(track));
  };

  useEffect(() => {
    fetchTrackData();
  }, []);

  if (loading) return null;
  return (
    <Box className="trackMainContainer">
      <img
        className="trackPhoto"
        src={track.track_photo}
        onClick={() => handlePlay(track)}
      />
      <Box className="trackTrackInfo">
        <Box className="trackTitlePlayDiv">
          <h2 className="trackTitle">{track.title}</h2>
          <IconButton
            onClick={() => handlePlay(track)}
            sx={{ padding: "0px", margin: "0px" }}
          >
            <PlayArrowIcon
              fontSize="large"
              sx={{
                color: "orange",
              }}
            />
          </IconButton>
        </Box>
        <Box className="trackArtists">
          {track.artists.map((artist) => (
            <Link
              key={artist.id}
              className="trackArtistLink"
              to={`/artist/${artist.id}`}
            >
              {artist.name}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Track;
