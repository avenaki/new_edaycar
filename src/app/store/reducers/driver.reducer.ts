import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { Driver } from "../../models/driver";
import * as DriverActions from "../actions/driver.actions";
import { AppState } from "../state/app.state";
import { DriverState, initialDriverState } from "../state/driver.state";



export const driverReducer = createReducer(
  initialDriverState,
  on(DriverActions.loadSuccess, (state,  driver: Driver) => {
    return { ...state, currentDriver: driver};
  }),
  on(DriverActions.loadFail, (state,  error: Error) => {
    console.log(error);
    return { ...state, currentDriver: null};
  }),
  on(DriverActions.loadDriversSuccess, (state, action) => {
    return {...state, drivers: action.drivers};
  }),
  on(DriverActions.loadDriversFail, (state, error) => {
    console.log(error);
    return {...state, drivers: null};
  }),
  on(DriverActions.editDriverSuccess, (state, action) => {
    const newDrivers = state.drivers.filter( (driver: Driver) => driver.login !== action.login);
    newDrivers.push(action);
    return {...state, drivers: newDrivers, currentDriver: action};
  }),

  on(DriverActions.editDriverFail, (state, error) => {
    console.log(error);
    return {...state, };
  }),
);

export const selectDriver = (state: AppState) => state.driver;

export const selectCurrentDriver = createSelector(
  selectDriver,
  (state: DriverState) => state.currentDriver);
export function driverReducerFunction(state: DriverState | undefined, action: Action): DriverState {
  return driverReducer(state, action);
}
