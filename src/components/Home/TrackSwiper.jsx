import { Link } from "react-router-dom";

import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

import "./home.css";

const TrackSwiper = ({ featuredTracks, handlePlay }) => {
  return (
    <Swiper
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination]}
      className="mySwiper"
    >
      {featuredTracks.map((track, index) => (
        <SwiperSlide key={index}>
          <img src={track.track_photo} className="homeTrackImg" />
          <Box>
            <h3>New featured track</h3>
            <Box className="homeTrackTitlePlayDiv">
              <h2 className="homeTrackTitle">{track.title}</h2>
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
            </Box>
            <Box className="homeArtistInfoDiv">
              {track.artists.map((artist) => (
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
              {track.tags.map((tag) => (
                <p className="homeTag" key={tag.id}>
                  #{tag.title}
                </p>
              ))}
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrackSwiper;
