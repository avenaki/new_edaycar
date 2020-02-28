import { Driver } from "../../entity/driver";

export interface DriverState {
  driver: Driver[];
}

export const initialDriverState: DriverState = {
  driver: [],
};
