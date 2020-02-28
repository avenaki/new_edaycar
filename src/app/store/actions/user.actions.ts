import { createAction, props } from "@ngrx/store";
import { UserModel } from "../../entity/user-model";

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

