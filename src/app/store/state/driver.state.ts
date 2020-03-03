import { Driver } from "../../models/driver";

export interface DriverState {
  drivers: Driver[];
  currentDriver: Driver;
}

export const initialDriverState: DriverState = {
  drivers: [],
  currentDriver: null
};
