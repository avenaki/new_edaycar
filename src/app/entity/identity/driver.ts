import { IDriver } from "./idriver";
import { Trip } from "./trip";

export class Driver implements IDriver {
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: Date;
  mobileNumber: string;
  trips: Trip[];
  experience: number;

  constructor(login: string, password: string, name: string, surname: string, patronymic: string, birthDate: Date,
              mobileNumber: string, experience: number, trips: Trip[] ) {
    this.login = login;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.birthDate = birthDate;
    this.mobileNumber = mobileNumber;
    this.experience = experience;
    this.trips = trips;

  }
}
