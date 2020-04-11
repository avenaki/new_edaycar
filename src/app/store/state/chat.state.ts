import { Chat } from "../../models/chat";

export interface ChatState {
  chats: Chat[];
  currentChat: Chat;
  currentError: Error;
}

export const initialChatState: ChatState = {
  chats: null,
  currentChat: null,
  currentError: null,
};
