import {Date2} from "./date";
/**
 * An expense entry
 */

export class Expense {

  // date in displayable string form
  dateString : string;

  constructor(public amount : number, public description : string, public place : string, public time : Date) {
    this.dateString = `${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()}`;
    console.log('Expense created');
  }

  getDate(): number {
    return this.time.getDate();
  }

  getMonth(): number {
    return this.time.getMonth();
  }

  getWeek(): number {
    let tDate = new Date2(this.time.getTime());
    return tDate.getWeek();
  }
}
