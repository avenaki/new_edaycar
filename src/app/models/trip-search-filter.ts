import DateTimeFormat = Intl.DateTimeFormat;

export class TripSearchFilter {
  canWalkDistance: number;
  startX: number;
  startY: number;
  finishX: number;
  finishY: number;
  startTime: DateTimeFormat;
  finishTime: DateTimeFormat;


  constructor( startTime: DateTimeFormat,
               finishTime: DateTimeFormat, startX: number,
               startY: number, finishX: number, finishY: number,
               canWalkDistance: number) {
    this.startTime = startTime;
    this.finishTime = finishTime;
    this.startX = startX;
    this.startY = startY;
    this.finishX = finishX;
    this.finishY = finishY;
    this.canWalkDistance = canWalkDistance;
  }
}
