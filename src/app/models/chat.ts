import { Action, createSelector } from "@ngrx/store";
import { chatReducer } from "../store/reducers/chat.reducer";
import { AppState } from "../store/state/app.state";
import { ChatState } from "../store/state/chat.state";
import { Message } from "./message";

export class Chat {
  id: string;
  participants: string [];
  messages: Message[];

  constructor(id: string, participants: string[], messages: Message[]) {
  this.id = id;
  this.participants = participants;
  this.messages = messages;
  }
}
export function ChatReducer(state: ChatState | undefined, action: Action): ChatState {
  return chatReducer(state, action);
}

export const selectChat = (state: AppState) => state.chat;
export const selectAllChats = createSelector(
  selectChat,
  (state: ChatState) => state.chats);

export const selectCurrentChat = createSelector(
  selectChat,
  (state: ChatState) => state.currentChat);

