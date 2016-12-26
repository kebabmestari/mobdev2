/**
 * Service class for providing diary entries to components
 */

import {Injectable} from "@angular/core";
import {Expense} from "./expense";
import {Date2} from "./date";

var listOfExpenses: Expense[] = [];

@Injectable()
export class ExpenseService {

  /**
   * @return {Expense[]} all expenses
   */
  getEntries(): Expense[] {
    return listOfExpenses;
  }

  /**
   * Filter entries by time criteria
   * @param begin of time in some numeric time format
   * @param end end of range in some numeric time format
   * @return array of expenses matching criteria
   */
  getEntriesByTime(begin: number, end: number): Expense[] {
    return listOfExpenses.filter((e) => {
      return (e.time.getTime() >= begin && e.time.getTime() <= end);
    });
  }
  getEntriesByDay(begin: number, end: number): Expense[] {
    return listOfExpenses.filter((e) => {
      return (e.getDate() >= begin && e.getDate() <= end);
    });
  }
  getEntriesByMonth(begin: number, end: number): Expense[] {
    return listOfExpenses.filter((e) => {
      return (e.getMonth() >= begin && e.getMonth() <= end);
    });
  }
  getEntriesByWeek(begin: number, end: number): Expense[] {
    return listOfExpenses.filter((e) => {
      return (e.getWeek() >= begin && e.getWeek() <= end);
    });
  }

  /**
   * Get entry array from certain time period
   */
  getEntriesToday(): Expense[] {
    let date = (new Date()).getDate();
    return this.getEntriesByDay(date, date);
  }
  getEntriesThisWeek(): Expense[] {
    let date = (new Date2()).getWeek();
    return this.getEntriesByWeek(date, date);
  }
  getEntriesThisMonth(): Expense[] {
    let date = (new Date()).getMonth();
    return this.getEntriesByMonth(date, date);
  }

  /**
   * Get spendings from certain timeperiod
   */
  getSpendingsToday(): number {
    let total: number = 0;
    this.getEntriesToday().forEach((e) => {total += +e.amount});
    return total;
  }
  getSpendingsWeek(): number {
    let total: number = 0;
    this.getEntriesThisWeek().forEach((e) => {total += +e.amount});
    return total;
  }
  getSpendingsMonth(): number {
    let total = 0;
    this.getEntriesThisMonth().forEach((e) => {total += +e.amount});
    return total;
  }

  /**
   * Delete expense entry from the array
   * @param e the expense object to be deleted
   */
  deleteExpense(e : Expense): void {
    console.log('deleting', e);
    listOfExpenses = listOfExpenses.filter((ex)=>{return ex !== e;});
  }

  /**
   * Create a new expense object
   * @param amount the cost
   * @param desc description of the expense
   * @param place optional place of the entry eg. shop
   * @return {Expense} expense object
   */
  createExpense(amount: number, desc: string, place?: string) : Expense {
    // get current time from unix epoch
    let e = new Expense(amount, desc.length>0?desc:'unkown', place?place:'unkown', new Date());
    listOfExpenses.push(e);
    console.log('new expense created');
    return e;
  }
}
