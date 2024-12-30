import {
  Box,
  Drawer,
  List,
  ListItem,
  Typography,
  IconButton,
  Stack,
  ListItemAvatar,
  Avatar,
  Badge,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { IconMessageCirclePlus, IconUsersGroup } from "@tabler/icons-react";
import NewChatModal from "@/components/NewChatModal";

const drawerWidth = 240;

interface Props {
  chats: any[];
  setSelectedChat: (chatId: string) => void;
  selectedChat: string | null;
  setShouldFetchChats: (value: boolean) => void;
}

const Sidebar = ({
  chats,
  setSelectedChat,
  setShouldFetchChats,
  selectedChat,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>("");

  const handleOpen = (type: string) => {
    setType(type);
    setOpen(true);
  };

  const drawer = (
    <>
      <List sx={{ overflowY: "auto", height: "calc(100vh - 64px)" }}>
        {chats &&
          chats.map((chat) => (
            <>
              <ListItemButton
                key={chat.chat_id}
                onClick={() => setSelectedChat(chat.chat_id)}
                selected={chat.chat_id === selectedChat}
              >
                <ListItemAvatar>
                  <Badge color="primary" variant="dot" invisible={!chat.unread}>
                    {chat.participants.length > 2 ? (
                      <Avatar>
                        <IconUsersGroup />
                      </Avatar>
                    ) : (
                      <Avatar src="/profile/botUser.jpg" />
                    )}
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={chat.participants.join(", ")}
                  sx={{ color: "#b5c6d1" }}
                />
              </ListItemButton>
              <Divider sx={{ backgroundColor: "#2A3942" }} />
            </>
          ))}
      </List>
    </>
  );
  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#111B21",
            },
          }}
          open
        >
          <Stack
            direction={"row"}
            spacing={4}
            sx={{ width: drawerWidth, height: "64px" }}
          >
            <Stack>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  color: "white",
                  textAlign: "left",
                  lineHeight: "40px",
                  pl: 2,
                  pt: 1.5,
                }}
              >
                Conversas{" "}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <IconButton
                onClick={() => handleOpen("single")}
                sx={{ color: "white" }}
              >
                <IconMessageCirclePlus />
              </IconButton>
              <IconButton
                onClick={() => handleOpen("group")}
                sx={{ color: "white" }}
              >
                <IconUsersGroup />
              </IconButton>
            </Stack>
          </Stack>
          {drawer}
        </Drawer>
      </Box>
      <NewChatModal
        open={open}
        onClose={() => setOpen(false)}
        onCreateChat={() => {}}
        setShouldFetchChats={setShouldFetchChats}
        type={type}
      />
    </>
  );
};
export default Sidebar;
