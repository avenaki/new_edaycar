import { IDriver } from "../../entity/identity/idriver";
import { IUser } from "../../entity/identity/iuser";

export interface IDriverState {
   drivers: IDriver[];
   selectedDriver: IUser;
}

export const initialDriverState: IDriverState = {
  drivers: null,
  selectedDriver: null
};
