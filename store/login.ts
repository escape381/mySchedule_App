import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "login",
  stateFactory: true,
  namespaced: true,
})
export default class Login extends VuexModule {
  private loggedIn: boolean = false;

  public get getLoggedIn() {
    return this.loggedIn;
  }
  @Mutation
  private setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }
  @Action
  public logout() {
    this.setLoggedIn(false);
  }
  @Action
  public login() {
    this.setLoggedIn(true);
  }
}
