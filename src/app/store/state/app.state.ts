import { IDriverState, initialDriverState } from "./driver.state";
import { initialPassengerState, IPassengerState } from "./passenger.state";

export interface IAppState {
  drivers: IDriverState;
  passengers: IPassengerState;
}

export const initialAppState: IAppState = {
  drivers: initialDriverState,
  passengers: initialPassengerState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
