export class ScheduleInfo {
  userid: string = "";
  startDt: string = "";
  endDt: string = "";
  content: string = "";

  constructor() {
    this.userid = "";
    this.startDt = "";
    this.endDt = "";
    this.content = "";
  }
  public setInfo(
    userid: string,
    startDt: string,
    endDt: string,
    title: string
  ) {
    this.userid = userid;
    this.startDt = startDt;
    this.endDt = endDt;
    this.content = title;
  }
}
