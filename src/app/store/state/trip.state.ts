import { Trip } from "../../models/trip";

export interface TripState {
  trip: Trip[];
  currentTrip: Trip;
  tripError: Error;
}

export const initialTripState: TripState = {
  trip: [],
  currentTrip: null,
  tripError: null,
};
