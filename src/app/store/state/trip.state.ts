import { Trip } from "../../models/trip";

export interface TripState {
  trip: Trip[];
}

export const initialTripState: TripState = {
  trip: [],
};
