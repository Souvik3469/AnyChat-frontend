import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  sender: 'user' | 'server';
  content: string;
}

const useWebSocket = (url: string, userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {

    const socketInstance = io(url, {
      transports: ["websocket"], 
      auth: { token: localStorage.getItem("auth") },
    });

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server (Log fron Client)");
    });

  
    socketInstance.on("connect_error", (error) => {
      console.log("WebSocket connection failed (Log fron Client)", error);
    });

    socketInstance.on("connect_timeout", () => {
      console.log("WebSocket connection timed out (Log fron Client)");
    });

  
    socketInstance.on("message", (msg: string) => {
      setMessages((prevMessages) => {
        const updatedMessages: ChatMessage[] = [
          ...prevMessages,
          { sender: 'server', content: msg },
        ];
        console.log(`Client receives same message from the server ${msg} (Log fron Client)`)
        localStorage.setItem(`chatMessages_${userId}`, JSON.stringify(updatedMessages)); 
        return updatedMessages;
      });
    });

 
    setSocket(socketInstance);


    return () => {
      socketInstance.disconnect();
      console.log("Disconnected from WebSocket server (Log fron Client)");
    };
  }, [url, userId]);

  useEffect(() => {
    const storedMessages = localStorage.getItem(`chatMessages_${userId}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
    console.log("Messages in storage (Log fron Client)",messages)
  }, [userId]);

  const sendMessage = (msg: string) => {
    if (socket) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', content: msg },
      ]);
      console.log(`Client sends message to the server ${msg} (Log fron Client)`)
      socket.emit("message", msg); 
    }
  };

  const clearChat = () => {
    setMessages([]); 
    localStorage.removeItem(`chatMessages_${userId}`);
  };

  return { messages, sendMessage, clearChat };
};

export default useWebSocket;
