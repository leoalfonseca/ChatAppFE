import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Modal,
  Typography,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import { createChat } from "@/services/api";
import { IconX } from "@tabler/icons-react";

interface NewChatModalProps {
  open: boolean;
  onClose: () => void;
  onCreateChat: (participants: string[]) => void;
  setShouldFetchChats: (value: boolean) => void;
  type?: string;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
  open,
  onClose,
  onCreateChat,
  setShouldFetchChats,
  type,
}) => {
  const [participantCount, setParticipantCount] = useState<number>(1);
  const [participants, setParticipants] = useState<string[]>([""]);

  const handleParticipantChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = value;
    setParticipants(updatedParticipants);
  };

  const handleCreateChat = () => {
    createChat(participants).then((chat) => {
      onCreateChat(chat.participants);
      setShouldFetchChats(true);
      onClose();
    });
  };

  const handleParticipantCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = Math.max(Number(e.target.value), 1);
    setParticipantCount(count);
    setParticipants(Array(count).fill(""));
  };

  useEffect(() => {
    setParticipants([""]);
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "#202C33",
          borderRadius: 3,
          p: 4,
        }}
      >
        <Stack direction={"row"} justifyContent="space-between" pb={3}> 
          <Typography variant="h6" color="white">
            {type === "group" ? "Novo Grupo" : "Nova Conversa"}
          </Typography>
          <IconButton onClick={onClose} >
            <IconX size={20} color="white"/>
          </IconButton>
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {type === "group" && (
            <TextField
              label="Número de Participantes"
              type="number"
              variant="outlined"
              fullWidth
              value={participantCount}
              onChange={handleParticipantCountChange}
              sx={{
                backgroundColor: "#2B3B42",
                color: "#fff",
                borderRadius: 3,
                "& .MuiOutlinedInput-root": {
                  borderColor: "#fff",
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  borderColor: "#fff",
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#fff",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                },
              }}
            />
          )}
          <Box sx={{ overflowY: "auto", maxHeight: 300 }}>
            {Array.from({ length: participantCount }).map((_, index) => (
              <TextField
                key={index}
                label={
                  type !== "group"
                    ? "Participante "
                    : `Participante ${index + 1}`
                }
                variant="outlined"
                fullWidth
                value={participants[index]}
                onChange={(e) => handleParticipantChange(index, e.target.value)}
                sx={{
                  backgroundColor: "#2B3B42",
                  color: "#fff",
                  borderRadius: 3,
                  my: 1,
                  "& .MuiOutlinedInput-root": {
                    borderColor: "#fff",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    borderColor: "#fff",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#fff",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#fff",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#fff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#fff",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2 }}
        >
          <Button
            onClick={onClose}
            color="error"
            variant="outlined"
            sx={{
              textTransform: "none",
              backgroundColor: "#d64646",
              color: "white",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateChat}
            sx={{
              backgroundColor: "#1A6BBB",
              color: "white",
              textTransform: "none",
            }}
            variant="contained"
          >
            Criar
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default NewChatModal;
