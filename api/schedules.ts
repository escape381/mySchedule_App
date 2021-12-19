import { $axios } from "~/utils/api";
import { ScheduleInfo } from "~/models/ScheduleInfo";

export const GetSchedules = async (id: string): Promise<ScheduleInfo[]> => {
  // Todo 今回はここでawaitしているが、どこでawaitするのが良いだろう。
  // もしここが遅ければUIが固まるのかな？
  // Todo 該当データがない場合の動きを考える
  // Todo あとidがない場合も
  const GET_SCHEDULE_API = "http://localhost:28080/message/" + id;
  const scheduleInfos = await $axios.$get<ScheduleInfo[]>(GET_SCHEDULE_API);
  // Todo このログはあとで消す
  console.log(scheduleInfos);

  return scheduleInfos;
};
