import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { Passenger } from "../../models/passenger";
import * as PassengerActions from "../actions/passenger.actions";
import { AppState } from "../state/app.state";
import { initialPassengerState, PassengerState } from "../state/Passenger.state";



export const passengerReducer = createReducer(
  initialPassengerState,
  on(PassengerActions.loadSuccess, (state,  passenger: Passenger) => {
    return { ...state, currentPassenger: passenger};
  }),
  on(PassengerActions.loadFail, (state,  error: Error) => {
    console.log(error);
    return { ...state, currentPassenger: null};
  }),
  on(PassengerActions.loadPassengersSuccess, (state, action) => {
    return {...state, Passengers: action.passengers};
  }),
  on(PassengerActions.loadPassengersFail, (state, error) => {
    console.log(error);
    return {...state, Passengers: null};
  }),
  on(PassengerActions.editPassengerSuccess, (state, action) => {
    const newPassengers = state.passengers.filter( (passenger: Passenger) => passenger.login !== action.login);
    newPassengers.push(action);
    return {...state, Passengers: newPassengers, currentPassenger: action};
  }),

  on(PassengerActions.editPassengerFail, (state, error) => {
    console.log(error);
    return {...state, };
  }),
);

export const selectPassenger = (state: AppState) => state.passenger;

export const selectCurrentPassenger = createSelector(
  selectPassenger,
  (state: PassengerState) => state.currentPassenger);
export function passengerReducerFunction(state: PassengerState | undefined, action: Action): PassengerState {
  return passengerReducer(state, action);
}
