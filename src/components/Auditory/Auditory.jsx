import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton, Pagination, Stack } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { setWaveformTrack } from "../../store/waveformSlice";
import "./auditory.css";

const Auditory = () => {
  const dispatch = useDispatch();
  const { storeTracks } = useSelector((state) => state.music);

  // pagiation variables
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTracks = storeTracks.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePlay = (track) => {
    dispatch(setWaveformTrack(track));
  };

  if (Object.keys(storeTracks).length == 0) return null;
  return (
    <Box className="auditoryMainContainer">
      <Box>
        <Box className="auditoryTracksDiv">
          {currentTracks.map((track) => (
            <Box key={track.id} className="auditoryTrackContainer">
              <img
                className="auditoryTrackPhoto"
                src={track.track_photo}
                onClick={() => handlePlay(track)}
              />
              <Box>
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
                <p className="auditoryPostedDate">Posted {track.upload_date}</p>
              </Box>
            </Box>
          ))}
        </Box>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(storeTracks.length / postsPerPage)}
            page={currentPage}
            onChange={handleChange}
            // variant="outlined"
            size="large"
            sx={{ "& button": { color: "white" } }}
            // color="secondary"
            shape="rounded"
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Auditory;
