/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import io from 'socket.io-client';

const useChatWebSocket = (chatId: string, setMessages: any) => {
  useEffect(() => {
    const socket = io(`ws://localhost:8000/ws/${chatId}`);

    socket.on('message_received', (data: any) => {
      setMessages((prevMessages: any) => [...prevMessages, data]);
    });

    socket.on('presence_updated', (data: any) => {
      console.log('Presence updated:', data);
    });

    socket.on('chat_read', (data: any) => {
      console.log('Chat read:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId, setMessages]);
};

export default useChatWebSocket;
