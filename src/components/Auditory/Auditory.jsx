import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { setWaveformTrack } from "../../store/waveformSlice";
import "./auditory.css";

const Auditory = () => {
  const dispatch = useDispatch();
  const { storeTracks } = useSelector((state) => state.music);

  const handlePlay = (track) => {
    dispatch(setWaveformTrack(track));
  };

  return (
    <Box className="auditoryMainContainer">
      <Box>
        <Box className="auditoryTracksDiv">
          {storeTracks.map((track) => (
            <Box key={track.id}>
              <Box className="auditoryTrackTitlePlayDiv">
                <h2 className="auditoryTrackTitle">{track.title}</h2>
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
              <Box className="auditoryArtistInfoDiv">
                {track.artists.map((artist) => (
                  <Link
                    key={artist.id}
                    to={`/artist/${artist.id}`}
                    className="auditoryArtistLink"
                  >
                    {artist.name}
                  </Link>
                ))}
              </Box>
              <Box className="auditoryTagsDiv">
                {track.tags.map((tag) => (
                  <p className="auditoryTag" key={tag.id}>
                    #{tag.title}
                  </p>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Auditory;
