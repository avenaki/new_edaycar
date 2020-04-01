import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "time"
})
export class TimePipe implements PipeTransform {

  transform(utcTime: string | Date): string {
    if ( typeof utcTime !== "string") {
      const newUtcTime = utcTime.toISOString();
      const dateArray = newUtcTime.toString().split("T");
      const newTimeArray = dateArray[1].split(":");
      const newResult = "";
      return newResult.concat(newTimeArray[0] + ":" + newTimeArray[1]);
    }
    const dateTimeArray = utcTime.toString().split("T");
    const timeArray = dateTimeArray[1].split(":");
    const result = "";
    return result.concat(timeArray[0] + ":" + timeArray[1]);
  }
}
