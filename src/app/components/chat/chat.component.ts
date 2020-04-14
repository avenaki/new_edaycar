import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Chat } from "../../models/chat";
import { Message } from "../../models/message";
import { UserModel } from "../../models/user-model";
import { ChatService } from "../../services/chat.service";
import { HttpService } from "../../services/http.service";
import * as ChatActions from "../../store/actions/chat.actions";
import * as fromChat from "../../store/reducers/chat.reducer";
import * as fromUser from "../../store/reducers/user.reducer";
import { AppState } from "../../store/state/app.state";


@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.less"]
})
export class ChatComponent implements OnInit {
  currentChats$: Observable<Chat[]>;
  currentChats: Chat[];
  currentChatsShow: Chat[];
  currentChat$: Observable<Chat>;
  currentChat: Chat;
  currentUser$: Observable<UserModel>;
  currentUser: UserModel;
  currentReceiverPicSubscription: Subscription;
  currentReceiverPic: string;
  currentText: string;
  searchUser: string;
  constructor( private store: Store< AppState >,
               private chatService: ChatService,
               private ngZone: NgZone,
               private _httpService: HttpService,
               private cdr: ChangeDetectorRef,
             ) {
    this.currentChats$ = store.select(fromChat.selectAllChats);
    this.currentUser$ = store.select(fromUser.selectUserCurrent);
    this.currentChat$ = store.select(fromChat.selectCurrentChat);
    this.chatService.messageReceived.subscribe((message: Message) => {
      this.ngZone.run(() => {
          message.type = "received";
          this.store.dispatch(ChatActions.receiveMessageSuccess( {message: message}));
          if ( !this.currentChats.some(chat => chat.participants[0] === message.sender) ||
               !this.currentChats.some(chat => chat.participants[1] === message.sender) ) {
            this.store.dispatch(ChatActions.loadAllChats( {login: this.currentUser.login }));
          }});
      });
  }
  ngOnInit(): void {
    this.currentUser$.subscribe( (user: UserModel) => {
      this.currentUser = user;
      const payload = { login: this.currentUser.login };
      this.store.dispatch(ChatActions.loadAllChats(payload));
    });
    this.currentChats$.subscribe( (chats: Chat[]) => {
      this.currentChats = chats;
      this.currentChatsShow = chats;
      this.cdr.markForCheck();
    });
    this.currentChat$ = this.store.select(fromChat.selectCurrentChat);
    this.currentChat$.subscribe( (chat: Chat) => {
      if (chat) {
        this.currentChat = chat;
        this.currentReceiverPicSubscription = this._httpService.loadPhoto(this.currentChat.participants.find((user => user !== this.currentUser.login))).subscribe(photo => this.currentReceiverPic = photo.picture);
        this.cdr.markForCheck();
      } });
  }

sendMessage(): void {
    const now = new Date;
    const currentTime = new  Date(Date.UTC(null, null, null ,
      now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds())).toISOString();
    const receiver = this.currentChat.participants.find((participant) => participant !== this.currentUser.login);
    const newMessage = new Message(receiver, this.currentUser.login, this.currentText, currentTime, "");
    this.store.dispatch(ChatActions.sendMessage({ message: newMessage}));
    this.chatService.sendMessageHub(newMessage);
    this.currentText = "";
    }

  selectChat(id: string): void {
    const payload = { id: id };
   this.store.dispatch(ChatActions.selectChatSuccess(payload));
  }

  messageSender(sender: string): string {
    return sender === this.currentUser.login ? "right" : "left";
  }

  findUser(): void {
    if ( this.searchUser.length === 0) {
      this.currentChatsShow = this.currentChats;
    } else {
      this.currentChatsShow = this.currentChats.filter( chat =>  {  return chat.participants[1] === this.searchUser ||
      chat.participants[0] === this.searchUser; });
    }
  }
}
