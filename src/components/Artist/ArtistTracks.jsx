import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import "./artist.css";

const ArtistTracks = ({ artist, handlePlay }) => {
  return (
    <Box className="artistPageTracks">
      <h1 className="artistPageTracksSectionTitle">Tracks</h1>
      {artist.tracks.map((track) => (
        <Box key={track.id} className="artistPageTrackContainer">
          <img
            className="artistPageTrackPhoto"
            src={track.track_photo}
            onClick={() => handlePlay(track)}
          />
          <Box>
            <Box className="artistPageTrackTitlePlayDiv">
              <h2 className="artistPageTrackTitle">{track.title}</h2>
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
            <Box className="artistPageArtistInfoDiv">
              {track.artists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  className="artistPageArtistLink"
                >
                  {artist.name}
                </Link>
              ))}
            </Box>
            <Box className="artistPageTagsDiv">
              {track.tags.map((tag) => (
                <p className="artistPageTag" key={tag.id}>
                  #{tag.title}
                </p>
              ))}
            </Box>
            <p className="artistPagePostedDate">Posted {track.upload_date}</p>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ArtistTracks;
