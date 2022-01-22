export class ScheduleInfo {
  id: string = "";
  userid: string = "";
  startDt: string = "";
  endDt: string = "";
  content: string = "";

  constructor() {
    this.id = "";
    this.userid = "";
    this.startDt = "";
    this.endDt = "";
    this.content = "";
  }
  public setInfo(
    id: string,
    userid: string,
    startDt: string,
    endDt: string,
    title: string
  ) {
    this.id = id;
    this.userid = userid;
    this.startDt = startDt;
    this.endDt = endDt;
    this.content = title;
  }
}
