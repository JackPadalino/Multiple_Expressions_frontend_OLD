import { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [tokenCreated, setTokenCreated] = useState(false);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
  };

  const handleJoinChat = async (e) => {
    e.preventDefault();
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }

    if (userId.trim() !== "") {
      // check that userId is not an empty string or contains only whitespaces
      const body = {
        userId: userId,
        isAdmin: "true",
      };

      try {
        const response = await axios.post(`${url}/api/chat/join`, body);
        if (response.status === 200 || response.status === 201) {
          setTokenCreated(true);
          console.log(response.data);
        }
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          // a request was made, but the server responded with an error status
          console.error(
            `Server responded with status ${error.response.status}`
          );
          console.error(error.response.data); // response data from the server
        } else if (error.request) {
          // a request was made, but no response was received
          console.error("No response received from the server");
        } else {
          // something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      }
    } else {
      // handle the case where userId is empty or contains only whitespaces
      console.error("userId is empty or contains only whitespaces");
    }
  };

  return (
    <>
      {!tokenCreated ? (
        <div>
          <h2>Join the chat</h2>
          <form onSubmit={handleJoinChat}>
            <input
              type="text"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter a username"
            />
            <button type="submit">Submit</button>
          </form>{" "}
        </div>
      ) : (
        <div>
          <div>
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Say something nice"
              />
              <button type="submit">Submit</button>
            </form>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
