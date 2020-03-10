export class Passenger {
  birthdate: Date;
  login: string;
  mobileNumber: string;
  name: string;
  password: string;
  patronymic: string;
  surname: string;
  token?: string;
  accountPhoto: string;

  constructor(login: string, password: string, name: string, surname: string, patronymic: string, birthDate: Date,
              mobileNumber: string, accountPhoto: string ) {
    this.login = login;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.birthdate = birthDate;
    this.mobileNumber = mobileNumber;
    this.accountPhoto = accountPhoto;
  }
}
