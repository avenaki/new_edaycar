import { Trip } from "./trip";

export class Driver {
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: Date;
  mobileNumber: string;
  experience: number;
  trips: Trip[];
  constructor(login: string, password: string, name: string, surname: string, patronymic: string, birthDate: Date,
              mobileNumber: string, experience: number ) {
    this.login = login;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.birthDate = birthDate;
    this.mobileNumber = mobileNumber;
    this.experience = experience;
  }
}
