import { initialUserState, IUserState } from "./user.state";

export interface IAppState {
  users: IUserState;
}

export const initialAppState: IAppState = {
  users: initialUserState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
