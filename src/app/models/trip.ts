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
  driverLogin: string;
  passengersLogins: string[];

  constructor( id: string,  startTime: DateTimeFormat,
               finishTime: DateTimeFormat, startX: number,
               startY: number, finishX: number, finishY: number,
               startPlace: string, finishPlace: string,
               maxPassengers: number, driverLogin: string,
               passengersLogins: string[]) {
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
    this.driverLogin = driverLogin;
    this.passengersLogins = passengersLogins;
  }
}
