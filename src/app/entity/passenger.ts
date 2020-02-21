import { IUser } from "./iuser";
import { Trip } from "./trip";

export class Passenger implements IUser {
  birthDate: Date;
  login: string;
  mobileNumber: string;
  name: string;
  password: string;
  patronymic: string;
  surname: string;
  trips: Trip[];
  token?: string;
}
