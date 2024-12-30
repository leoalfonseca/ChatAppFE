import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState, useEffect } from "react";
import { getChats } from "../services/api";
import ChatBox from "../components/ChatBox";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";
import { CssBaseline } from "@mui/material";

export default function ChatApp() {
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [shouldFetchChats, setShouldFetchChats] = useState<boolean>(true);

  const fetchChats = async () => {
    const fetchedChats = await getChats();
    let fetchedChartsReverse = fetchedChats.reverse();
    setChats(fetchedChartsReverse);
  };

  useEffect(() => {
    if (shouldFetchChats) {
      fetchChats();
      setShouldFetchChats(false);
    }
  }, [shouldFetchChats]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url('/chat_background/chatBackground.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "100vh",
          m: 0,
          p: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Header chats={chats} selectedChat={selectedChat} />
        <Sidebar
          chats={chats}
          setSelectedChat={setSelectedChat}
          setShouldFetchChats={setShouldFetchChats}
          selectedChat={selectedChat}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: `calc(100% - 300px)`,
            pl: 35,
            overflowY: "auto",
          }}
        >
          <Toolbar />
          {selectedChat && <ChatBox chatId={selectedChat} chats={chats} />}
        </Box>
      </Box>
    </>
  );
}
