import { Passenger } from "../../entity/passenger";

export interface PassengerState {
  passenger: Passenger [];
}

export const initialPassengerState: PassengerState = {
  passenger: [],
};
