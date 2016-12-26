import {Injectable} from "@angular/core";
/**
 * Created by samlinz on 23.12.2016.
 */

// monthly budget, other budgets will be counted from this
var monthlyBudget: number = 0;

/**
 * Set and get the current budget status
 * simplified, assumes exactly 30 days or 4 weeks in a month
 */
@Injectable()
export class BudgetService {
  getMonthly(): number {
    return monthlyBudget;
  }
  setMonthly(budget: number): void {
    if(!budget) return;
    monthlyBudget = budget;
  }
  getDaily(): number {
    return monthlyBudget / 30;
  }
  setDaily(budget: number): void {
    if(!budget) return;
    monthlyBudget = budget * 30;
  }
  getWeekly(): number {
    return this.getDaily() * 7;
  }
  setWeekly(budget: number): void {
    if(!budget) return;
    monthlyBudget = budget * 4;
  }
}
