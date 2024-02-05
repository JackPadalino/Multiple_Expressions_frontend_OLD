import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import {
//   setStoreAccessToken,
//   resetStoreAccessToken,
// } from "../../store/usersSlice";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import "./admin.css";

const Admin = () => {
  const navigate = useNavigate();
  // user login
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isAuthenicated, setIsAuthenticated] = useState(false);
  // const { storeAccessToken } = useSelector((state) => state.users);

  const onCredentialsChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let url;
      if (import.meta.env.VITE_DEV_MODE === "true") {
        url = import.meta.env.VITE_DEV_URL;
      } else {
        url = import.meta.env.VITE_PROD_URL;
      }

      const response = await axios.post(`${url}/api/users/token`, credentials);
      if (
        response.status === 200 ||
        response.status === 204 ||
        response.status === 205
      ) {
        window.localStorage.clear();
        window.localStorage.setItem("access_token", response.data.access);
        window.localStorage.setItem("refresh_token", response.data.refresh);
        // dispatchEvent(setStoreAccessToken(response.data.access));
        setIsAuthenticated(true);
        // navigate("/live");
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Handle error
      if (error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }

      // setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      let url;
      if (import.meta.env.VITE_DEV_MODE === "true") {
        url = import.meta.env.VITE_DEV_URL;
      } else {
        url = import.meta.env.VITE_PROD_URL;
      }

      const token = window.localStorage.getItem("refresh_token");

      const response = await axios.post(`${url}/api/users/logout`, {
        refresh_token: token,
      });

      if (
        response.status === 200 ||
        response.status === 204 ||
        response.status === 205
      ) {
        window.localStorage.clear();
        // dispatchEvent(resetStoreAccessToken());
        setIsAuthenticated(false);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        setIsAuthenticated(false);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      // setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // check for the presence of an access token in localStorage
    const token = localStorage.getItem("access_token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      {!isAuthenicated && (
        <Box
          className="mainBox"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <TextField
            //margin="normal"
            required
            fullWidth
            onChange={onCredentialsChange}
            id="username"
            label="Username"
            name="username"
            //autoComplete="username"
            value={credentials.username}
            //autoFocus
          />
          <TextField
            //margin="normal"
            required
            fullWidth
            onChange={onCredentialsChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            value={credentials.password}
            //autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" size="large">
            Login
          </Button>
        </Box>
      )}
      {isAuthenicated && (
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      )}
    </Container>
  );
};

export default Admin;
