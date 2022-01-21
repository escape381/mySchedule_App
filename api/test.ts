import { $axios } from "~/utils/api";
import Axios from "axios";

export const Err500 = async (ms: number): Promise<string> => {
  try {
    const ERR500_API = "http://localhost:28080/waitErr500/" + `${ms}`;
    const res = await $axios.$get<string>(ERR500_API);
    console.log("Catchを通過していません500");
    console.log(res);
    return res;
  } catch (e) {
    if (Axios.isAxiosError(e)) {
      console.error("Catchを通過しています500");
      console.error(e.response?.status);
      console.error(e.message);
    } else {
      console.error("Catchを通過していますがelse500");
      console.error(e);
    }
    return "err500!";
  }
};
export const Err404 = async (ms: number): Promise<string> => {
  try {
    const ERR404_API = "http://localhost:28080/waitErr404/" + `${ms}`;
    const res = await $axios.$get<string>(ERR404_API);
    console.log("Catchを通過していません404");
    console.log(res);
    return res;
  } catch (e) {
    if (Axios.isAxiosError(e)) {
      console.error("Catchを通過しています404");
      console.error(e.response?.status);
      console.error(e.message);
    } else {
      console.error("Catchを通過していますがelse404");
      console.error(e);
    }
    return "err404!";
  }
};
