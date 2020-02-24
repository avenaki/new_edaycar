import { IUser } from "./iuser";

export interface IDriver extends IUser {
  experience: number;
  carModel: string;
  color: string;
}
