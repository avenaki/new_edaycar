import {  createReducer, createSelector, on } from "@ngrx/store";
import { Chat } from "../../models/chat";
import * as ChatActions from "../actions/chat.actions";
import { AppState } from "../state/app.state";
import { ChatState, initialChatState } from "../state/chat.state";


export const chatReducer = createReducer(
  initialChatState,
  on(ChatActions.loadAllMessagesSuccess, (state,  action) => {
    const newChat =  state.currentChat;
    newChat.messages = action.messages;
    return { ...state, currentChat: newChat};
  }),
  on(ChatActions.loadAllMessagesFail, (state,  error) => {
    return { ...state, currentChat: null, currentError: error};
  }),
  on(ChatActions.sendMessageSuccess, (state) => {
    return { ...state, currentChat: state.currentChat};
  }),
  on(ChatActions.sendMessageFail, (state,  error) => {
    return { ...state, currentError: error};
  }),
  on(ChatActions.startChatSuccess, (state,  chat: Chat) => {
    const newChats = [...state.chats];
    newChats.push(chat);
    return { ...state, chats: newChats};
  }),
  on(ChatActions.startChatFail, (state,  error) => {
    return { ...state,  currentError: error};
  }),
  on(ChatActions.loadAllChatsSuccess, (state,  payload) => {
    return { ...state, chats: payload.chats};
  }),
  on(ChatActions.loadAllChatsFail, (state,  error) => {
    return { ...state,  currentError: error};
  }),
  on(ChatActions.receiveMessageSuccess, (state, payload) => {
    const newChat = Object.assign({}, state.currentChat);
    if ( newChat !== null) {
    if ( (newChat.participants[0] === payload.message.sender &&
      newChat.participants[1] === payload.message.receiver) || (
      newChat.participants[1] === payload.message.sender &&
      newChat.participants[0] === payload.message.receiver
    )  ) {
      newChat.messages = Object.assign([], newChat.messages);
      newChat.messages.push(payload.message);
    }
    }

    return {...state, currentChat: newChat };
  }),
  on( ChatActions.selectChatSuccess, (state, payload) => {
    const currentChat = state.chats.find( (chat) => chat.id === payload.id);
    return{...state, currentChat: currentChat};
  }),
  on( ChatActions.leaveChatSuccess, (state) => {
    return{...state, currentChat: null};
  }),
  );


export const selectChat = (state: AppState) => state.chat;
export const selectAllChats = createSelector(
  selectChat,
  (state: ChatState) => state.chats);

export const selectCurrentChat = createSelector(
  selectChat,
  (state: ChatState) => state.currentChat);

