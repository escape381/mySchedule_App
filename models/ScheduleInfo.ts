export class ScheduleInfo {
  startDate: string = "";
  endDate: string = "";
  content: string = "";

  constructor() {
    this.startDate = "";
    this.endDate = "";
    this.content = "";
  }
  public setInfo(
    startDate: string,
    endDate: string,
    title: string,
    detail: string
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.content = title;
  }
}
