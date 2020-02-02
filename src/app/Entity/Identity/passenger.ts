export class Passenger {
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: Date;
  mobileNumber: string;

  constructor(login: string, password: string, name: string, surname: string, patronymic: string, birthDate: Date,
             mobileNumber: string ) {
    this.login = login;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.birthDate = birthDate;
    this.mobileNumber = mobileNumber;
  }
}
