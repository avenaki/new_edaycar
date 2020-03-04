import { Trip } from "../../models/trip";

export interface TripState {
  trip: Trip[];
  tripError: Error;
}

export const initialTripState: TripState = {
  trip: [],
  tripError: null,
};
