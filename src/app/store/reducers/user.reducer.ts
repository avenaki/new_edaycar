import { Action, createReducer, on } from "@ngrx/store";
import { UserModel } from "../../entity/user-model";
import * as UserActions from "../actions/user.actions";
import { initialUserState, UserState } from "../state/user.state";


export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loginSuccess, (state,  user: UserModel) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { ...state, user: user, userError: null};
}),
  on(UserActions.loginFail, (state,  error: Error) => {
    console.log(error);
    return { ...state, userError: null};
  }),
  on(UserActions.logout, (state) => {
    localStorage.removeItem("currentUser");
    return {...state, user: null, userError: null};
  }),
  on(UserActions.getUser, (state) => {
    return {...state, user:  JSON.parse(localStorage.getItem("currentUser")), userError: null};
  }),

);

export function UserReducer(state: UserState | undefined, action: Action): UserState {
  return userReducer(state, action);
}

