import { Action, createReducer, on } from "@ngrx/store";
import { Trip } from "../../models/trip";
import * as TripActions from "../actions/trip.actions";
import { initialTripState, TripState } from "../state/trip.state";




export const  tripReducer = createReducer(
  initialTripState,
  on(TripActions.addTripSuccess, (state, trip: Trip) => {
    state.trip.push(trip);
    return { ...state, trip: state.trip, tripError: null};
  }),
  on(TripActions.addTripFail, (state,  error: Error) => {
    return { ...state, tripError: error};
  }),
  );


export function TripReducer(state: TripState | undefined, action: Action): TripState {
  return tripReducer(state, action);
}

