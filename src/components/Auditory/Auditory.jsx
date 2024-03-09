import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { setWaveformTrack } from "../../store/waveformSlice";

import SingleTrack from "./SingleTrack";
import Paginate from "./Paginate";
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
    <>
      <Box className="auditoryMainContainer">
        <Box>
          <Box className="auditoryTracksDiv">
            {currentTracks.map((track) => (
              <SingleTrack
                key={track.id}
                track={track}
                handlePlay={handlePlay}
              />
            ))}
          </Box>
        </Box>
        <Box className="pagination">
          <Paginate
            storeTracks={storeTracks}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            handleChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default Auditory;
