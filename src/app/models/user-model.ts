export class UserModel {
  login: string;
  token: string;
  role: string;

  constructor(login: string, token: string, role: string) {
    this.login = login;
    this.token = token;
    this.role = role;
  }
}
