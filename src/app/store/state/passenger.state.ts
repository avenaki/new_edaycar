import { IUser } from "../../entity/identity/iuser";

export interface IPassengerState {
  passengers: IUser[];
  selectedPassenger: IUser;
}

export const initialPassengerState: IPassengerState = {
  passengers: null,
  selectedPassenger: null
};
