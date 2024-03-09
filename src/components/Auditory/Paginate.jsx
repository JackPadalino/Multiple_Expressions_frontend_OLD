import { Pagination, Stack } from "@mui/material";
import "./auditory.css";

const Paginate = ({ storeTracks, postsPerPage, currentPage, handleChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(storeTracks.length / postsPerPage)}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
        size="large"
        sx={{
          "& button": {
            color: "white",
          },
        }}
      />
    </Stack>
  );
};

export default Paginate;
