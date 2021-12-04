import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Login from "~/store/login";

let LoginStore: Login;

function initializeStores(store: Store<any>): void {
  LoginStore = getModule(Login, store);
}

export { initializeStores, LoginStore };
