import { UserModel } from "../../entity/user-model";

export interface UserState {
  user: UserModel  | null;
  userError: Error | null;
}

export const initialUserState: UserState = {
  user: null,
  userError: null
};
