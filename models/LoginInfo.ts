export class LoginInfo {
  userId: string = "";
  loggedIn: boolean = false;

  constructor() {
    this.userId = "";
    this.loggedIn = false;
  }
  public setLogin(userId: string) {
    this.userId = userId;
    this.loggedIn = true;
  }
}
