import { Passenger } from "../../models/passenger";


export interface PassengerState {
  passengers: Passenger [];
  currentPassenger: Passenger;
}

export const initialPassengerState: PassengerState = {
  passengers: [],
  currentPassenger: null,
};
