import React, { useState } from "react";
import { Box, Avatar, Typography, Divider, Button } from "@mui/material";
import { IconChecks } from "@tabler/icons-react";

const isImage = (url: string) => {
  return url.startsWith("http");
};

const isAudio = (url: string) => {
  return url.match(/\.(mp3|wav|ogg)$/i);
};

interface MessageProps {
  content: string;
  user: {
    name: string;
    avatar: string;
    time: string;
    color?: string;
  };
}

const Message: React.FC<MessageProps> = ({ content, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 70;

  const formatMessage = (msg: string) => {
    const lineLength = 50;
    let formattedMessage = "";
    for (let i = 0; i < msg.length; i += lineLength) {
      formattedMessage += msg.slice(i, i + lineLength) + "\n";
    }
    return formattedMessage;
  };

  const truncatedContent =
    content.length > charLimit && !isExpanded
      ? content.slice(0, charLimit) + "..."
      : content;

  return (
    <Box display="flex" alignItems="flex-start" mb={2}>
      <Avatar alt={user.name} src={user.avatar} sx={{ mr: 2 }} />
      <Box
        sx={{
          backgroundColor: "#202C33",
          borderRadius: 3,
          py: 1,
          px: 2,
          minWidth: "10em",
        }}
      >
        <Typography variant="subtitle1" color="#c4cfd3">
          {user.name}
        </Typography>
        <Divider />

        {isAudio(content) ? (
          <audio controls>
            <source src={content} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        ) : isImage(content) ? (
          <img
            src={content}
            alt="Message content"
            style={{ maxWidth: "30vh", borderRadius: "8px" }}
          />
        ) : (
          <Typography
            variant="body1"
            color="#A6ADB0"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {isExpanded ? formatMessage(content) : truncatedContent}
          </Typography>
        )}

        {content.length > charLimit && !isExpanded && (
          <Button
            onClick={() => setIsExpanded(true)}
            sx={{ mt: 1, color: "#A6ADB0", textTransform: "none" }}
          >
            Ver mais
          </Button>
        )}

        {isExpanded && content.length > charLimit && (
          <Button
            onClick={() => setIsExpanded(false)}
            sx={{ mt: 1, color: "#A6ADB0", textTransform: "none" }}
          >
            Ver menos
          </Button>
        )}
        <Box display="flex" justifyContent="right" alignItems="right">
          <Typography
            variant="body1"
            color="#A6ADB0"
          >
            {user.time}
          </Typography>
          <IconChecks size={16}  color={user.color} style={{alignSelf: 'center', marginLeft: 4}} />
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
