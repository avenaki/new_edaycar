import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Chat } from "../../../models/chat";
import * as ChatActions from "../../../store/actions/chat.actions";
import * as fromChat from "../../../store/reducers/chat.reducer";
import { AppState } from "../../../store/state/app.state";
@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["../trip.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent  implements  OnInit, OnDestroy {
  @Output() closeEvent = new EventEmitter<void>();
  @Input()  userLogin: string;
  @Input()  currentUserLogin: string;
  existingChats$: Observable<Chat[]>;
  existingChats: Chat[];
  existingChatsSubscription: Subscription;
  mistakeMessage: string;
  chatChecked = false;
  constructor (  private store: Store<AppState>,
                 private router: Router,
                 private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    const payload = { login: this.currentUserLogin};
    this.store.dispatch(ChatActions.loadAllChats(payload));
    this.existingChats$ = this.store.select(fromChat.selectAllChats);
    this.existingChatsSubscription = this.existingChats$.subscribe( (chats) => {
      if ( chats ) {
        this.existingChats = chats;
        if ( this.existingChats.find( (chat) => (chat.participants[1] === this.currentUserLogin &&
          chat.participants[0] === this.userLogin) || (chat.participants[0] === this.currentUserLogin &&
          chat.participants[1] === this.userLogin)) ) {
          this.mistakeMessage = " Чат уже создан";
          this.chatChecked = true;
          this.cdr.markForCheck();
        } else {
          this.chatChecked = true;
          this.cdr.markForCheck();
        }

      }});
    }
  submit(): void {
    const newChat = new Chat(null, [this.userLogin, this.currentUserLogin], []);
    this.store.dispatch(ChatActions.startChat(newChat));
    this.router.navigate(["/chat"]);
    this.chatChecked = false;
    this.closeEvent.emit();
  }
  ngOnDestroy(): void {
  this.existingChatsSubscription.unsubscribe();
  }
}
