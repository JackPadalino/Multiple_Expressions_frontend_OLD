import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Box } from "@mui/material";
import { setWaveformTrack } from "../../store/waveformSlice";

import ArtistInfo from "./ArtistInfo";
import ArtistTracks from "./ArtistTracks";
import "./artist.css";

const Artist = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState({});

  const formatDates = (tracks) => {
    const newDateTracks = tracks.map((track) => {
      const dateObject = new Date(track.upload_date);
      const formattedDate = dateObject.toISOString().split("T")[0];
      // creating a new object to append the new updated upload date
      // the original objects are 'read only'
      return {
        ...track,
        upload_date: formattedDate,
      };
    });
    return newDateTracks;
  };

  const fetchArtistData = async () => {
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    try {
      const response = await axios.get(`${url}/api/music/artists/${id}`);
      const updatedTracks = formatDates(response.data.tracks);
      response.data.tracks = updatedTracks;
      setArtist(response.data);
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
    fetchArtistData();
  }, []);

  if (loading) return null;
  return (
    <>
      <Box className="artistPageMainContainer">
        <ArtistInfo artist={artist} />
        <ArtistTracks artist={artist} handlePlay={handlePlay} />
      </Box>
    </>
  );
};

export default Artist;
