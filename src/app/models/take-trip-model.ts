import { Trip } from "./trip";

export class TakeTripModel {
  login: string;
  trip: Trip;

  constructor(login: string, trip: Trip) {
    this.login = login;
    this.trip = trip;
  }
}
