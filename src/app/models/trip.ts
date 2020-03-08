import { Driver } from "./driver";
import { Passenger } from "./passenger";
import DateTimeFormat = Intl.DateTimeFormat;

export class Trip {
  id: string;
  startTime: DateTimeFormat;
  finishTime: DateTimeFormat;
  startX: number;
  startY: number;
  startPlace: string | undefined;
  finishPlace: string | undefined;
  finishX: number;
  finishY: number;
  maxPassengers: number;
  driver: Driver;
  passengers: Passenger[];

  constructor( id: string,  startTime: DateTimeFormat,
               finishTime: DateTimeFormat, startX: number,
               startY: number, finishX: number, finishY: number,
               startPlace: string, finishPlace: string,
               maxPassengers: number, driver: Driver,
               passengers: Passenger[]) {
    this.id = id;
    this.startTime = startTime;
    this.finishTime = finishTime;
    this.startX = startX;
    this.startY = startY;
    this.finishX = finishX;
    this.finishY = finishY;
    this.startPlace = startPlace;
    this.finishPlace = finishPlace;
    this.maxPassengers = maxPassengers;
    this.driver = driver;
    this.passengers = passengers;
  }
}
