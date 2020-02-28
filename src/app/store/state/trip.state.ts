import { Trip } from "../../entity/trip";

export interface TripState {
  trip: Trip[];
}

export const initialTripState: TripState = {
  trip: [],
};
