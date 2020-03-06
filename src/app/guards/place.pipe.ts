import { MapsAPILoader } from "@agm/core";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "place"
})
export class PlacePipe implements PipeTransform {
  private geoCoder: google.maps.Geocoder;
  private result: string;

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
  });
  }


  transform(x: number, y: number): string {
    this.geoCoder.geocode({ "location": { lat: x, lng: y} }, (results, status) => {
      if (status === "OK") {
        if ( results[0] ) {
          this.result = results[0].formatted_address;
        }
      }
      });
    while (!this.result) {
      console.log(1);
    }
    return this.result;
  }
}
