import useChatWebSocket from "@/hooks/useChatWebSocket";
import { AppBar, Toolbar, Typography, Box, Avatar, Stack } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

interface Props {
  chats: any[];
  selectedChat: string | null;
}

const Header = ({ chats, selectedChat }: Props) => {
  const [status, setStatus] = useState<string | null>("offline");

  useChatWebSocket(selectedChat, undefined, setStatus, undefined, undefined);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        height: "70px",
        backgroundColor: "#202C33",
      }}
    >
      <Toolbar>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src="/profile/botUser.jpg" />
            <Stack direction="column" spacing={0}>
              <Typography variant="h6" noWrap>
                {selectedChat
                  ? chats
                      .find((chat) => chat.chat_id === selectedChat)
                      ?.participants.join(", ")
                  : "Chat App"}
              </Typography>
              <Typography variant="subtitle2" color="#A6ADB0">
                {status}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
