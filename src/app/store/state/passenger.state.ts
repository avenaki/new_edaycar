import { IPassenger } from "../../entity/identity/ipassenger";

export interface IPassengerState {
  passengers: IPassenger[];
  selectedPassenger: IPassenger;
}

export const initialPassengerState: IPassengerState = {
  passengers: null,
  selectedPassenger: null
};
