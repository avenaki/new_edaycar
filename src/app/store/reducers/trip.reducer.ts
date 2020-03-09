import { Action, createReducer, createSelector, on } from "@ngrx/store";
import * as TripActions from "../actions/trip.actions";
import { AppState } from "../state/app.state";
import { initialTripState, TripState } from "../state/trip.state";




export const  tripReducer = createReducer(
  initialTripState,
  on(TripActions.addTripSuccess, (state, trip) => {
    const newTrips = [...state.trip];
    newTrips.push(trip);
    return { ...state, trip: newTrips, tripError: null};
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
  on(TripActions.filterTripsSuccess, (state,  action) => {
    return { ...state, trip:  action.trip};
  }),
  on(TripActions.filterTripsError, (state,  error) => {
    return { ...state, tripError: error};
  }),
  );


export function TripReducer(state: TripState | undefined, action: Action): TripState {
  return tripReducer(state, action);
}

export const selectTrip = (state: AppState) => state.trip;
export const selectAllTrips = createSelector(
  selectTrip,
  (state: TripState) => state.trip);


