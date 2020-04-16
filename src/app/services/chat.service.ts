import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Chat } from "../models/chat";
import { Message } from "../models/message";
import { AuthenticationService } from "./authentication.service";


@Injectable({
  providedIn: "root"
})
export class ChatService {
  apiUrl = environment.apiUrl;
  apiHub = environment.apiHub;
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;
  constructor(private http: HttpClient,
              private _authService: AuthenticationService) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
    console.log(this.connectionIsEstablished);
  }
  public startChat( chat: Chat ): Observable<Chat>  {
    return this.http.post<Chat>(this.apiUrl + "chat/startchat", chat );
  }
  public sendMessage( message: Message ): Observable<Message>  {
    return this.http.post<Message>(this.apiUrl + "chat/sendmessage", message );
  }

  public loadMessages( chatId: string ): Observable<Message[]>  {
    return this.http.get<Message[]>(this.apiUrl + "chat/loadallmessages" + chatId );
  }
  public loadAllChats( login: string ): Observable<Chat[]>  {
    return this.http.post<Chat[]>(this.apiUrl + "chat/loadallchats", {login: login});
  }
  sendMessageHub(  message: Message): void {
    this._hubConnection.invoke("NewMessage", message);
  }

  private createConnection(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.apiHub + "MessageHub",  { accessTokenFactory: () => this._authService.getToken() })
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log("Hub connection started");
        this.connectionEstablished.emit(true);
      })
      .catch(() => {
        console.log("Error while establishing connection, retrying...");
        setTimeout(() => { this.startConnection(); }, 10000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on("MessageReceived", (data: Message) => {
      this.messageReceived.emit(data);
    });
  }
}
