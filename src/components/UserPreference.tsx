import React from 'react';
import { Box, Typography } from '@mui/material';

interface UserPresenceProps {
  user: string;
  status: string;
}

const UserPresence: React.FC<UserPresenceProps> = ({ user, status }) => {
  return (
    <Box className="user-presence">
      <Typography>{user}: {status}</Typography>
    </Box>
  );
};

export default UserPresence;
