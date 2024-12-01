import { useState, useEffect, useRef } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { jwtDecode } from "jwt-decode";

const ChatApp = () => {
  const [message, setMessage] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const backendUrl = "https://anychat-backend.onrender.com";
  // console.log(backendUrl);
  const { messages, sendMessage, clearChat } = useWebSocket(backendUrl, userId);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      const decoded: any = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!userId) {
    return <div>Please log in to access the chat.</div>;
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className=" flex flex-col">
      <div className="bg-blue-800 text-white p-4 text-center font-semibold text-xl">
        Hello User {userId}
      </div>

      <div className="flex flex-col items-center p-4 ">
        <div className="w-full max-w-md bg-white p-4 rounded shadow-md">
          <div
            className="flex flex-col space-y-2 overflow-y-scroll max-h-[500px] no-scrollbar"
            style={{ maxHeight: "500px" }}
          >
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div
                  className={`p-2 rounded-md ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-100 text-black self-start"
                  }`}
                  style={{ maxWidth: "80%" }}
                >
                  {msg.content}
                </div>
                <div
                  className={`p-1 text-sm  ${
                    msg.sender === "user" ? "self-end" : "self-start"
                  }`}
                  style={{ maxWidth: "80%" }}
                >
                  {msg.sender === "user"
                    ? `${msg.sender}${userId}`
                    : `${msg.sender}`}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-l-md"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-md"
            >
              Send
            </button>
          </div>
        </div>

        <button
          className="bg-red-600 text-white p-2 rounded-md mt-4"
          onClick={clearChat}
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
