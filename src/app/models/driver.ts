import { Trip } from "./trip";

export class Driver  {
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  birthdate: Date | string;
  mobileNumber: string;
  trips: Trip[];
  experience: number;
  token?: string;
  color: string;
  accountPhoto: string;
  carModel: string;

  constructor(login: string, password: string, name: string, surname: string, patronymic: string, birthDate: Date,
              mobileNumber: string, experience: number, color: string, accountPhoto: string, carModel: string,  trips: Trip[] ) {
    this.login = login;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.birthdate = birthDate;
    this.mobileNumber = mobileNumber;
    this.experience = experience;
    this.trips = trips;
    this.color =  color;
    this.carModel = carModel;
    this.accountPhoto = accountPhoto;

  }
}
