import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { UserModel } from "../../models/user-model";
import * as UserActions from "../actions/user.actions";
import { AppState } from "../state/app.state";
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
  on(UserActions.signDriverFail, (state, error: Error) => {
    return {...state, user: null, userError: error};
  }),

);

export function UserReducer(state: UserState | undefined, action: Action): UserState {
  return userReducer(state, action);
}


export const selectUser = (state: AppState) => state.user;

export const selectUserCurrent = createSelector(
  selectUser,
  (state: UserState) => state.user);
