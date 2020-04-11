export class Message {
  receiver: string;
  sender: string;
  text: string;
  sendTime: Date | string;
  type: string;

  constructor(receiver: string, sender: string, text: string, sendTime: Date | string, type: string) {
    this.receiver = receiver;
    this.sender = sender;
    this.text = text;
    this.sendTime = sendTime;
    this.type = type;
  }
}
