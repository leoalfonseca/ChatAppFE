import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState, useEffect } from "react";
import { getChats } from "../services/api";
import ChatBox from "../components/ChatBox";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";
import Grid from "@mui/material/Grid2";

export default function ChatApp() {
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      const fetchedChats = await getChats();
      setChats(fetchedChats);
    };

    fetchChats();
  }, []);

  return (
    <Grid container>
      <Grid size={12}>
        <Header />
      </Grid>
      <Grid size={4}>
        <Sidebar chats={chats} setSelectedChat={setSelectedChat} />
      </Grid>
      <Grid size={8}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
          }}
        >
          <Toolbar />
          {selectedChat && <ChatBox chatId={selectedChat} />}
        </Box>
      </Grid>
    </Grid>
  );
}
