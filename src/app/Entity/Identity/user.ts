import { IUser } from "./iuser";
import { Trip } from "./trip";

export class User implements IUser {
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: Date;
  mobileNumber: string;
  trips: Trip[];

  constructor(login: string, password: string, name: string, surname: string, patronymic: string, birthDate: Date,
              mobileNumber: string, trips: Trip[] ) {
    this.login = login;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.birthDate = birthDate;
    this.mobileNumber = mobileNumber;
    this.trips = trips;
  }

}
