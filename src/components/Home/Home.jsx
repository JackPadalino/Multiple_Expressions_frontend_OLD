import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { setWaveformTrack } from "../../store/waveformSlice";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { storeTracks } = useSelector((state) => state.music);
  const [featuredTrack, setFeaturedTrack] = useState(storeTracks[0]);

  const handlePlay = (track) => {
    dispatch(setWaveformTrack(track));
  };

  return (
    <Box className="homeMainContainer">
      <Box className="homeIntroDiv">
        <h1 className="homeTitle">Multiple Expressions</h1>
        <p className="homeDesc">
          Showcasing the wealth of lesser-known talent of the NYC electronic
          music scene.
        </p>
      </Box>
      <Box className="homeFeaturedTrackDiv">
        <h2>New featured track</h2>
        <img src={featuredTrack.track_photo} className="homeTrackImg" />
        <Box className="homeTrackTitlePlayDiv">
          <h2 className="homeTrackTitle">{featuredTrack.title}</h2>
          <IconButton
            onClick={() => handlePlay(featuredTrack)}
            sx={{ padding: "0px", margin: "0px" }}
          >
            <PlayArrowIcon
              fontSize="medium"
              sx={{
                color: "orange",
              }}
            />
          </IconButton>
        </Box>
        <Box className="homeArtistInfoDiv">
          {featuredTrack.artists.map((artist) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="homeArtistLink"
            >
              {artist.name}
            </Link>
          ))}
        </Box>
        <Box className="homeTagsDiv">
          {featuredTrack.tags.map((tag) => (
            <p className="homeTag" key={tag.id}>
              #{tag.title}
            </p>
          ))}
        </Box>
      </Box>
      <p className="homeInvitation">
        Want to post with us? Have something you want to share? Email
        <span className="homeEmail"> multiple.expressionsnyc@gmail.com</span>.
        We post all tracks.
      </p>
    </Box>
  );
};

export default Home;
