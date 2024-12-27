/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

export const createChat = async (participants: string[]) => {
  const response = await api.post('/chats', { participants });
  return response.data;
};

export const getChats = async () => {
  const response = await api.get('/chats');
  return response.data;
};

export const getMessages = async (chatId: string) => {
  const response = await api.get(`/chats/${chatId}/messages`);
  return response.data;
};

export const sendMessage = async (chatId: string, message: any) => {
  const response = await api.post(`/chats/${chatId}/messages`, message);
  return response.data;
};

export const updateUserPresence = async (chatId: string, userPresence: any) => {
  const response = await api.post(`/chats/${chatId}/presence`, userPresence);
  return response.data;
};

export const markChatAsRead = async (chatId: string, userId: string) => {
  const response = await api.post(`/chats/${chatId}/read`, { user_id: userId });
  return response.data;
};
