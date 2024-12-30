import { useEffect } from "react";

const useChatWebSocket = (
  chatId: string | null,
  setMessages?: React.Dispatch<React.SetStateAction<any[]>>,
  setStatus?: React.Dispatch<React.SetStateAction<any>>,
  setChatRead?: React.Dispatch<React.SetStateAction<boolean>>,
  shouldUpdateMessage?: boolean
) => {
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${chatId}`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Event Type:", data.event);
      console.log("Payload:", data.data);

      if (data.event === "message_received" && shouldUpdateMessage && setMessages) {
        setMessages((prevMessages: any[]) => [...prevMessages, { ...data.data, isRead: false }]);
      } else if (data.event === "presence_updated" && setStatus) {
        setStatus(data.data.status);
      } else if (data.event === "chat_read" && setMessages) {
        setMessages((prevMessages: any[]) =>
          prevMessages.map((msg) =>
            msg.id <= data.data.last_read_message_id
              ? { ...msg, isRead: true }
              : msg
          )
        );
        if (setChatRead) {
          setChatRead(true);
        }
      }
    };

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [chatId, setMessages, shouldUpdateMessage, setStatus, setChatRead]);
};

export default useChatWebSocket;
