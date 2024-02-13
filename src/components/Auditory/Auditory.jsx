import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
        <div className="tracksDiv">
          {storeTracks.map((track) => (
            <div key={track.id}>
              <h2 className="trackTitle" onClick={() => handlePlay(track)}>
                {track.title}
              </h2>
              <div className="auditoryArtistInfo">
                {track.artists.map((artist) => (
                  <Link
                    key={artist.id}
                    to={`/artist/${artist.id}`}
                    className="artistLink"
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>
              <div className="tagsDiv">
                {track.tags.map((tag) => (
                  <p className="tag" key={tag.id}>
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
