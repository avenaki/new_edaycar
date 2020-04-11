import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "receiver"
})
export class MessageReceiverPipe implements PipeTransform {

  transform(participants: string[], currentUser: string): string {
    return participants.find((user => user !== currentUser));
  }
}
