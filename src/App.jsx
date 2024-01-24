import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Router from "./components/Router";
import { setStoreUsers } from "../src/store/musicSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8000/api/users/all")
      .then((userData) => {
        const mappedUsers = userData.data.map(user => ({
          id: user.id,
          username:user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          profilePhoto:`http://localhost:8000${user.profile.profile_photo}`
        }));
        dispatch(setStoreUsers(mappedUsers));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Router />
    </>
  )
}

export default App
