import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./chat.css";

const Chat = () => {
  const socket = "wss://edge.ivschat.us-east-1.amazonaws.com";
  const [chatToken, setChatToken] = useState(null);
  const [chatConnection, setChatConnection] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const { storeBroadcasting } = useSelector((state) => state.live);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const updateChat = (newMessage) => {
    setChatMessages((prevChatMessages) => [...prevChatMessages, newMessage]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    // send message if a token has been generated and we are currently broadcasting
    if (chatToken && storeBroadcasting) {
      const payload = {
        Action: "SEND_MESSAGE",
        Content: message,
      };
      try {
        chatConnection.send(JSON.stringify(payload));
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleJoinChat = async (e) => {
    e.preventDefault();
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }

    // check that userId is not an empty string or contains only whitespaces
    if (username.trim() !== "") {
      const body = {
        username: username,
        role: "user",
      };
      // try to create a token if we are currently broadcasting
      // prevents new people from joining if there is no stream
      if (storeBroadcasting) {
        try {
          const response = await axios.post(`${url}/api/chat/join`, body);
          if (response.status === 200 || response.status === 201) {
            const token = response.data.token;
            const connection = new WebSocket(socket, token);
            connection.onmessage = (event) => {
              const data = JSON.parse(event.data);
              updateChat({
                username: data.Sender.Attributes.username,
                content: data.Content,
                timestamp: data.SendTime,
              });
            };
            setChatToken(token);
            setChatConnection(connection);
          }
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
    }
  };

  return (
    <div className="chatMainContainer">
      {chatMessages.map((message) => (
        <p key={message.id}>
          {message.username}: {message.content}
        </p>
      ))}
      {!chatToken && storeBroadcasting && (
        <div>
          <h2>Join the chat</h2>
          <form onSubmit={handleJoinChat}>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter a username"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {chatToken && storeBroadcasting && (
        <div>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Say something nice"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
