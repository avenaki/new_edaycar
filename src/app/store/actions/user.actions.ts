import { createAction, props } from "@ngrx/store";
import { Driver } from "../../models/driver";
import { Passenger } from "../../models/passenger";
import { UserModel } from "../../models/user-model";
export const login = createAction(
  "[User] - Login",
  props<{login: string; password: string; }>(),
);
export const loginSuccess = createAction(
  "[User] - Login Success",
  props<UserModel>(),
);
export const loginFail = createAction(
  "[User] - Login Fail",
  props<Error>(),
);
export const logout = createAction(
  "[User] - Logout",
);
export const getUser = createAction(
  "[User] - Get",
);

export const signDriver = createAction(
  "[User] - Signup Driver",
  props<Driver>(),
);

export const signDriverFail = createAction(
  "[User] - Signup Driver Fail",
  props<Error>(),
);
export const signPassenger = createAction(
  "[User] - Signup Passenger",
  props<Passenger>(),
);
export const signPassengerSuccess = createAction(
  "[User] - Signup Passenger Success",
  props<Passenger>(),
);
export const signPassengerFail = createAction(
  "[User] - Signup Passenger Fail",
  props<Error>(),
);
