import React from 'react';
import { Box, Typography } from '@mui/material';

interface MessageProps {
  content: string;
}

const Message: React.FC<MessageProps> = ({ content }) => {
  return (
    <Box className="message">
      <Typography>{content}</Typography>
    </Box>
  );
};

export default Message;
