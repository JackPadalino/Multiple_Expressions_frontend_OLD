import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { setWaveformTrack } from "../../store/waveformSlice";
import "./auditory.css";

const Auditory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { storeTracks } = useSelector((state) => state.music);
  const { waveformTrack } = useSelector((state) => state.waveform);
  const [formattedTracks, setFormattedTracks] = useState([]);

  const handlePlay = (track) => {
    dispatch(setWaveformTrack(track));
  };

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
    setFormattedTracks(newDateTracks);
    setLoading(false);
  };

  useEffect(() => {
    formatDates(storeTracks);
  }, []);

  if (loading) return null;
  return (
    <Box className="auditoryMainContainer">
      <Box>
        <Box className="auditoryTracksDiv">
          {formattedTracks.map((track) => (
            <Box key={track.id} className="auditoryTrackContainer">
              <img className="auditoryTrackPhoto" src={track.track_photo} />
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
          ))}
        </Box>
      </Box>
      <Box className="auditoryPlayingTrackContainer">
        {Object.keys(waveformTrack).length !== 0 &&
          waveformTrack.artists.map((artist, index) => (
            <Box key={index} className="auditoryPlayingTrackArtist">
              <Link key={artist.id} to={`/artist/${artist.id}`}>
                <img
                  className="auditoryPlayingTrackImg"
                  src={artist.profile_photo}
                />
              </Link>
              <h2>{artist.name}</h2>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Auditory;
