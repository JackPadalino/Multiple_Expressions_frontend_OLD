import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { setWaveformTrack } from "../../store/waveformSlice";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";
// import "react-social-icons/tiktok";
import "./home.css";

// Swiper js
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

const Home = () => {
  const dispatch = useDispatch();
  const { storeTracks } = useSelector((state) => state.music);
  const featuredTrack = storeTracks[0];
  const swiperTracks = storeTracks.slice(0, 3);

  const handlePlay = (track) => {
    dispatch(setWaveformTrack(track));
  };

  return (
    <Box className="homeMainContainer">
      <Box className="homeFeaturedTrackDiv">
        <img src={featuredTrack.track_photo} className="homeTrackImg" />
        <Box>
          <h3>New featured track</h3>
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
      </Box>

      <Box className="homeIntroDiv">
        <h1 className="homeTitle">Multiple Expressions</h1>
        <p className="homeDesc">
          Showcasing the wealth of lesser-known talent of the NYC electronic
          music scene.
        </p>
      </Box>

      <p className="homeInvitation">
        Want to post with us? DM us on Instagram or email
        <span className="homeEmail"> multiple.expressionsnyc@gmail.com</span>.
      </p>

      <Box className="homeSocialsDiv">
        <p style={{ fontSize: "14px", fontStyle: "italic" }}>
          We post all tracks.
        </p>
        <SocialIcon
          bgColor="black"
          network="instagram"
          url="https://www.instagram.com/multiple.expressions?igsh=dzdiOHZsYXZqeXlr&utm_source=qr"
          target="_blank"
        />
        {/* <SocialIcon
            bgColor="black"
            network="tiktok"
            url="https://www.tiktok.com/@multiple.expressions?_t=8kCuPgn7YJn&_r=1"
            target="_blank"
          /> */}
      </Box>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {swiperTracks.map((track, index) => (
          <SwiperSlide key={index}>{track.title}</SwiperSlide>
        ))}
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </Box>
  );
};

export default Home;
