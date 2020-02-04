import { IUser } from "../../Entity/Identity/iuser";

export interface IUserState {
   users: IUser[];
   selectedUser: IUser;
}

export const initialUserState: IUserState = {
  users: null,
  selectedUser: null
};
