import { Trip } from "./trip";
import { User } from "./user";

export class Driver extends User {

  experience: number;

  constructor(login: string, password: string, name: string, surname: string, patronymic: string, birthDate: Date,
              mobileNumber: string, experience: number, trips: Trip[] ) {
    super(login, password, name, surname, patronymic, birthDate, mobileNumber,  trips );
    this.experience = experience;

  }
}
