import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";
import "react-social-icons/soundcloud";

import { Box, Typography, Avatar, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { setWaveformTrack } from "../../store/waveformSlice";

import Loading from "../Loading/Loading";
import "./artist.css";

const Artist = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState({});

  const handlePlay = (track) => {
    dispatch(setWaveformTrack(track));
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
      setArtist(response.data);
      console.log(response.data);
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

  useEffect(() => {
    fetchArtistData();
  }, []);

  if (loading) return null;
  return (
    <>
      <div className="artistPageMainContainer">
        <div className="artistPageArtistDiv">
          <img className="artistPageMobileImg" src={artist.profile_photo} />
          <div className="artistPageArtistInfo">
            <h1>{artist.name}</h1>
            <p>{artist.bio}</p>
            <div className="artistPageSocials">
              {artist.social_media.map((social) => (
                <SocialIcon
                  key={social.id}
                  bgColor="black"
                  network={social.platform}
                  url={social.link}
                  target="_blank"
                />
              ))}
            </div>
          </div>
          <img className="artistPageDesktopImg" src={artist.profile_photo} />
        </div>
        <div className="artistPageTracks">
          <h1>Tracks</h1>
          {artist.tracks.map((track) => (
            <div key={track.id}>
              <div className="artistPageTrackTitlePlayDiv">
                <h2
                  className="artistPageTrackTitle"
                  onClick={() => handlePlay(track)}
                >
                  {track.title}
                </h2>
                <IconButton
                  onClick={() => handlePlay(track)}
                  sx={{ padding: "0px", margin: "0px" }}
                >
                  <PlayArrowIcon
                    fontSize="medium"
                    sx={{
                      color: "orange",
                    }}
                  />
                </IconButton>
              </div>
              <div className="artistPageArtistInfoDiv">
                {track.artists.map((artist) => (
                  <Link
                    key={artist.id}
                    to={`/artist/${artist.id}`}
                    className="artistPageArtistLink"
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>
              <div className="artistPageTagsDiv">
                {track.tags.map((tag) => (
                  <p className="artistPageTag" key={tag.id}>
                    #{tag.title}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Artist;
