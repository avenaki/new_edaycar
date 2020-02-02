import { Place } from "../Value/place";
import { Driver } from "./driver";

export class Trip {
  id: number;
  start: Place;
  finish: Place;
  startTime: Date;
  finishTime: Date;
  maxPassengers: number;
  driver: Driver;

  constructor( id: number, start: Place, finish: Place, startTime: Date, finishTime: Date, maxPassengers: number, driver: Driver) {
    this.id = id;
    this.start = start;
    this.finish = finish;
    this.startTime = startTime;
    this.finishTime = finishTime;
    this.maxPassengers = maxPassengers;
    this.driver = driver;
  }
}
