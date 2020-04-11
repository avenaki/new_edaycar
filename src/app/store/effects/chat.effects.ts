import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Chat } from "../../models/chat";
import { Message } from "../../models/message";
import { ChatService } from "../../services/chat.service";
import * as ChatActions from "../actions/chat.actions";

@Injectable()
export class ChatEffects {
  constructor(private action$: Actions,
              private chatService: ChatService) {
  }

  startChat$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatActions.startChat),
      mergeMap(action =>
        this.chatService.startChat(action).pipe(
          map((data: Chat) => {
            return ChatActions.startChatSuccess(data);
          }),
          catchError((error: Error) => {
            return of(ChatActions.startChatFail(error));
          }),
        ),
      ),
    );
  });

  sendMessage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatActions.sendMessage),
      mergeMap(action =>
        this.chatService.sendMessage(action.message).pipe(
          map(() => {
            const payload = { message: action.message};
            return ChatActions.sendMessageSuccess(payload);
          }),
          catchError((error: Error) => {
            return of(ChatActions.sendMessageFail(error));
          }),
        ),
      ),
    );
  });

  loadAllMessages$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatActions.loadAllMessages),
      mergeMap(action =>
        this.chatService.loadMessages(action.id).pipe(
          map((data: Message[]) => {
            const payload = { messages: data};
            return ChatActions.loadAllMessagesSuccess(payload);
          }),
          catchError((error: Error) => {
            return of(ChatActions.loadAllMessagesFail(error));
          }),
        ),
      ),
    );
  });
  loadAllChats$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatActions.loadAllChats),
      mergeMap(action =>
        this.chatService.loadAllChats(action.login).pipe(
          map((data:  Chat[]) => {
            const payload = { chats: data};
            return ChatActions.loadAllChatsSuccess(payload);
          }),
          catchError((error: Error) => {
            return of(ChatActions.loadAllChatsFail(error));
          }),
        ),
      ),
    );
  });

}
