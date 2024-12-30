import React, { useState, useEffect, useRef } from "react";
import { sendMessage, getMessages } from "../services/api";
import useChatWebSocket from "../hooks/useChatWebSocket";
import Message from "./Message";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { IconSend } from "@tabler/icons-react";

interface ChatBoxProps {
  chatId: string;
  chats: any[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId, chats }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [status, setStatus] = useState<string | null>("offline");
  const [read, setRead] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useChatWebSocket(chatId, setMessages, setStatus, setRead, true);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(chatId);
      setMessages(fetchedMessages.map((msg: any) => ({ ...msg, isRead: false })));
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMsg = {
        user_id: chats.find((chat) => chat.chat_id === chatId)?.participants[0],
        type: "text",
        content: newMessage,
        isRead: false, 
      };
      await sendMessage(chatId, newMsg);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box>
      <Box className="message-list" sx={{ overflowY: "auto", height: "80vh", pt: 5 }}>
        {messages.map((msg) => {
          const currentChat = chats.find((chat) => chat.chat_id === chatId);
          const isCurrentUser = msg.user_id === currentChat?.participants[0];

          const messageTime = new Date(msg.timestamp);
          messageTime.setHours(messageTime.getHours() - 3);
          return (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                pr: 2,
              }}
            >
              <Message
                content={msg.content}
                user={{
                  name: msg.user_id,
                  avatar:
                    msg.user_id === "bot_user"
                      ? "/profile/botUser.jpg"
                      : "/profile/user.jpg",
                  time: messageTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  color: msg.isRead ? "#53bdeb" : "#A6ADB0",
                }}
              />
            </Box>
          );
        })}
        {status === "typing" && (
          <Message
            content="..."
            user={{
              name: "bot_user",
              avatar: "/profile/botUser.jpg",
              time: "",
              color: "#A6ADB0",
            }}
          />
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
          backgroundColor: "#202C33",
          p: 2,
          borderRadius: 3,
        }}
      >
        <Grid container direction="row" spacing={2}>
          <Grid item xs={11.5}>
            <TextField
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite uma mensagem"
              onKeyDown={handleKeyDown}
              sx={{
                backgroundColor: "#2B3B42",
                color: "#fff",
                borderRadius: 3,
                "& .MuiOutlinedInput-root": {
                  borderColor: "#C4CFD3",
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  borderColor: "#C4CFD3",
                },
                "& .MuiInputLabel-root": {
                  color: "#C4CFD3",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#C4CFD3",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#C4CFD3",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                },
              }}
            />
          </Grid>
          <Grid item xs={0.5} sx={{ alignSelf: "center" }}>
            <IconButton color="primary" onClick={handleSendMessage}>
              <IconSend size={24} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatBox;
