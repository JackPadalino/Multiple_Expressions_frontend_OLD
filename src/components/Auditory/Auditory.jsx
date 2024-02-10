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
        <h1>Auditory</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {storeTracks.map((track) => (
            <div key={track.id}>
              {/* <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              > */}
              <h2
                onClick={() => handlePlay(track)}
                style={{ cursor: "pointer" }}
              >
                {track.title}
              </h2>
              {/* {playerLoading[track.id] && <p>-_-</p>} */}
              {/* </div> */}
              <div style={{ display: "flex", gap: "10px" }}>
                {track.artists.map((artist) => (
                  <a
                    key={artist.id}
                    href={`#`}
                    style={{ textDecoration: "none", color: "#3366cc" }}
                  >
                    {artist.name}
                  </a>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {track.tags.map((tag) => (
                  <p key={tag.id}>#{tag.title}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="waveformDiv">
        <div ref={waveformRef}></div>
      </div> */}
    </div>
  );
};

export default Auditory;
