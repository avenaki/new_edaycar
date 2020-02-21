import { Trip } from "./trip";

export interface IUser {
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: Date;
  mobileNumber: string;
  token?: string;
  trips: Trip[];

}
