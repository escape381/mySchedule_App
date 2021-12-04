import { $axios } from "~/utils/api";

export const Login = async (id: string, password: string): Promise<boolean> => {
  let data = { UserID: id, Password: password };
  const LOGIN_API = "http://localhost:28080/login";
  const loginInfo = await $axios.$post(LOGIN_API, data);
  return loginInfo.Certification;
};
