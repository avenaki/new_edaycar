import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { Trip } from "../../models/trip";
import * as TripActions from "../actions/trip.actions";
import { AppState } from "../state/app.state";
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
  on(TripActions.loadTripsFail, (state,  error: Error) => {
    return { ...state, tripError: error};
  }),
  on(TripActions.loadTripsSuccess, (state,  action) => {
    return { ...state, trip:  action.trip};
  }),
  );


export function TripReducer(state: TripState | undefined, action: Action): TripState {
  return tripReducer(state, action);
}

export const selectTrip = (state: AppState) => state.trip;
export const selectAllTrips = createSelector(
  selectTrip,
  (state: TripState) => state.trip);


