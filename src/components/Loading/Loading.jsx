import "./loading.css";

const Loading = () => {
  return (
    <div className="loadingMainContainer">
      <img
        src={`https://${
          import.meta.env.VITE_AWS_S3_BUCKET
        }.s3.amazonaws.com/site_photos/logo.jpeg`}
        className="loadingImg"
      />
      <h2 className="loadingTitle">Patience...</h2>
    </div>
  );
};

export default Loading;
