import { createAction, props } from "@ngrx/store";
import { Chat } from "../../models/chat";
import { Message } from "../../models/message";

export const startChat = createAction(
  "[Chat] - Start Chat ",
  props<Chat>(),
);
export const startChatSuccess = createAction(
  "[Chat] - Start Chat Success",
  props<Chat>(),
);
export const startChatFail = createAction(
  "[Chat] - Start Chat Fail",
  props<Error>(),
);

export const loadAllMessages = createAction(
  "[Chat] - Load All Messages  ",
  props<{ id: string; }>(),
);
export const loadAllMessagesSuccess = createAction(
  "[Chat] - Load All Messages Success",
  props<{ messages: Message[]; }>(),
);
export const loadAllMessagesFail = createAction(
  "[Chat] - Load All Messages Fail",
  props<Error>(),
);


export const sendMessage = createAction(
  "[Chat] - Send  Message  ",
  props<{message: Message}>(),
);
export const  sendMessageSuccess = createAction(
  "[Chat] - Send  Message Success",
  props<{message: Message}>(),
);
export const sendMessageFail = createAction(
  "[Chat] -Send  Message Fail",
  props<Error>(),
);


export const loadAllChats = createAction(
  "[Chat] - Load All Chats ",
  props<{login: string}>(),
);
export const loadAllChatsSuccess = createAction(
  "[Chat] - Load All Chats Success",
  props<{ chats: Chat[]}>(),
);
export const loadAllChatsFail = createAction(
  "[Chat] - Load All Chats Fail",
  props<Error>(),
);


export const receiveMessageSuccess = createAction(
  "[Chat] - Receive  Message  ",
  props<{message: Message}>(),
);

export const selectChatSuccess = createAction(
  "[Chat] -  Select  Chat  ",
  props<{id: string}>(),
);
