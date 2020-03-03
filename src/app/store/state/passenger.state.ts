import { Passenger } from "../../models/passenger";

export interface PassengerState {
  passenger: Passenger [];
}

export const initialPassengerState: PassengerState = {
  passenger: [],
};
