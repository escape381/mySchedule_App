export class ScheduleInfo {
  scheduleDate: string = "";
  title: string = "";
  detail: string = "";

  constructor() {
    this.scheduleDate = "";
    this.title = "";
    this.detail = "";
  }
  public setInfo(scheduleDate: string, title: string, detail: string) {
    this.scheduleDate = scheduleDate;
    this.title = title;
    this.detail = detail;
  }
}
