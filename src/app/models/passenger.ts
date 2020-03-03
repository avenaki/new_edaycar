import { Trip } from "./trip";

export class Passenger {
  birthdate: Date;
  login: string;
  mobileNumber: string;
  name: string;
  password: string;
  patronymic: string;
  surname: string;
  trips: Trip[];
  token?: string;
  accountPhoto: string;
}
