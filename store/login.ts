import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { LoginInfo } from "~/models/LoginInfo";

@Module({
  name: "login",
  stateFactory: true,
  namespaced: true,
})
export default class Login extends VuexModule {
  private loginInfo: LoginInfo = new LoginInfo();

  public get getLoggiedIn() {
    return this.loginInfo.loggedIn;
  }

  public get getLoginInfo() {
    return this.loginInfo;
  }
  @Mutation
  private setLoggedIn(info: LoginInfo) {
    this.loginInfo = info;
  }
  @Action
  public logout() {
    this.setLoggedIn(new LoginInfo());
  }
  @Action
  public login(userId: string) {
    let info = new LoginInfo();
    info.setLogin(userId);
    this.setLoggedIn(info);
  }
}
