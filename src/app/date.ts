/**
 * Javascript Date class with some custom extensions
 */

export class Date2 {
  dateObject: Date;
  constructor(d?: number) {
    if(d) {
      this.dateObject = new Date(d);
    } else {
      this.dateObject = new Date();
    }
  }
  getWeek() : number {
    var day_miliseconds = 86400000,
      onejan = new Date(this.dateObject.getFullYear(),0,1,0,0,0),
      onejan_day = (onejan.getDay()==0) ? 7 : onejan.getDay(),
      days_for_next_monday = (8-onejan_day),
      onejan_next_monday_time = onejan.getTime() + (days_for_next_monday * day_miliseconds),
      // If one jan is not a monday, get the first monday of the year
      first_monday_year_time = (onejan_day>1) ? onejan_next_monday_time : onejan.getTime(),
      this_date = new Date(this.dateObject.getFullYear(), this.dateObject.getMonth(),this.dateObject.getDate(),0,0,0),// This at 00:00:00
      this_time = this_date.getTime(),
      days_from_first_monday = Math.round(((this_time - first_monday_year_time) / day_miliseconds));

    var first_monday_year = new Date(first_monday_year_time);

    return (days_from_first_monday>=0 && days_from_first_monday<364) ? Math.ceil((days_from_first_monday+1)/7) : 52;
  } // from https://bitbucket.org/agustinhaller/date.getweek
}
