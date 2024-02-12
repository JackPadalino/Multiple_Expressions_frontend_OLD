import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="notFoundMainContainer">
      <Link to="/auditory">
        <img
          src={`https://${
            import.meta.env.VITE_AWS_S3_BUCKET
          }.s3.amazonaws.com/site_photos/logo.jpeg`}
          className="notFoundImg"
        />
      </Link>
      <h2 className="notFoundTitle">Sorry. Page not found.</h2>
    </div>
  );
};

export default NotFound;
