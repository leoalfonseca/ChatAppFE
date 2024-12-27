/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { sendMessage, getMessages } from '../services/api';
import useChatWebSocket from '../hooks/useChatWebSocket';
import Message from './Message';
import { Box, Button, TextField } from '@mui/material';

interface ChatBoxProps {
  chatId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useChatWebSocket(chatId, setMessages);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(chatId);
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(chatId, { user_id: 'user1', type: 'text', content: newMessage });
      setNewMessage('');
    }
  };

  return (
    <Box>
      <Box className="message-list">
        {messages.map((msg) => (
          <Message key={msg.id} content={msg.content} />
        ))}
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default ChatBox;
