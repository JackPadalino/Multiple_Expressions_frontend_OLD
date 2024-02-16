import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
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
    <div className="auditoryMainContainer">
      <div>
        <div className="auditoryTracksDiv">
          {storeTracks.map((track) => (
            <div key={track.id}>
              <div className="auditoryTrackTitlePlayDiv">
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
              </div>
              <div className="auditoryArtistInfoDiv">
                {track.artists.map((artist) => (
                  <Link
                    key={artist.id}
                    to={`/artist/${artist.id}`}
                    className="auditoryArtistLink"
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>
              <div className="auditoryTagsDiv">
                {track.tags.map((tag) => (
                  <p className="auditoryTag" key={tag.id}>
                    #{tag.title}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auditory;
