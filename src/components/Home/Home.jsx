import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="homeMainContainer">
      <Link to="/auditory">
        <img
          src={`https://${
            import.meta.env.VITE_AWS_S3_BUCKET
          }.s3.amazonaws.com/site_photos/logo.jpeg`}
          className="homeImg"
        />
      </Link>
      <h2 className="homeTitle">Multiple Expressions</h2>
    </div>
  );
};

export default Home;
