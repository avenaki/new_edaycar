import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "place"
})
export class PlacePipe implements PipeTransform {

  transform(address: string): string {
    const addressArray = address.split(",");
    const result = "";
    return result.concat(addressArray[0], addressArray[1], addressArray[2]);
  }
}
