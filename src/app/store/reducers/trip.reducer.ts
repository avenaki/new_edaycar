import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { Trip } from "../../models/trip";
import * as TripActions from "../actions/trip.actions";
import { AppState } from "../state/app.state";
import { initialTripState, TripState } from "../state/trip.state";





export const  tripReducer = createReducer(
  initialTripState,
  on(TripActions.addTripSuccess, (state, trip) => {
    const newTrips = [...state.trip];
    const newTrip = new Trip(trip.id, trip.startTime, trip.finishTime,
      trip.startX, trip.startY, trip.finishX, trip.finishY, trip.startPlace, trip.finishPlace,
      trip.maxPassengers, trip.driverLogin, trip.passengersLogins);
    newTrip.startTime = new Date(trip.startTime);
    newTrip.finishTime = new Date(trip.finishTime);
    newTrips.push(newTrip);
    return { ...state, trip: newTrips, tripError: null};
  }),
  on(TripActions.addTripFail, (state,  error: Error) => {
    return { ...state, tripError: error};
  }),
  on(TripActions.loadTripsFail, (state,  error: Error) => {
    return { ...state, tripError: error};
  }),
  on(TripActions.loadTripSuccess, (state,  trip: Trip) => {
    return { ...state, currentTrip: trip};
  }),
  on(TripActions.loadTripFail, (state,  error: Error) => {
    return { ...state, currentTrip: null, tripError: error};
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
  on(TripActions.editTripSuccess, (state, action) => {
    const newTrips = state.trip.filter( (trip: Trip) => trip.id !== action.id);
    newTrips.push(action);
    return {...state,  trip: newTrips, currentTrip: action};
  }),

  on(TripActions.editTripFail, (state, error) => {
    console.log(error);
    return {...state, };
  }),
  on(TripActions.deleteTripSuccess, (state, action) => {
    const newTrips = state.trip.filter( (trip: Trip) => trip.id !== action.id);
    return {...state,  trip: newTrips};
  }),

  on(TripActions.deleteTripFail, (state, error) => {
    console.log(error);
    return {...state, };
  }),
  on(TripActions.dropCurrentTrip, (state) => {
    return {...state, currentTrip: null };
  }),
  );


export function tripReducerFunction(state: TripState | undefined, action: Action): TripState {
  return tripReducer(state, action);
}

export const selectTrip = (state: AppState) => state.trip;
export const selectAllTrips = createSelector(
  selectTrip,
  (state: TripState) => state.trip);

export const selectCurrentTrip = createSelector(
  selectTrip,
  (state: TripState) => state.currentTrip);
