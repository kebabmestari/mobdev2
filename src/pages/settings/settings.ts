import { Component } from '@angular/core';

import {NavController, ToastController} from 'ionic-angular';
import {BudgetService} from "../../app/budget.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  daily: number;
  weekly: number;
  monthly: number;

  constructor(
    public navCtrl: NavController,
    public budget: BudgetService,
    public alert: ToastController
  ) {}

  /**
   * Recalculate and update budget values
   */
  updateValuesMonthly(e: any) {
    this.monthly = +e.target.value;
    this.daily = this.monthly / 30;
    this.weekly = this.daily * 7;
  }
  updateValuesDaily(e: any) {
    this.daily = +e.target.value;
    this.weekly = this.daily * 7;
    this.monthly = this.daily * 30;
  }
  updateValuesWeekly(e: any) {
    this.daily = +e.target.value / 7;
    this.weekly = this.daily * 7;
    this.monthly = this.daily * 30;
  }

  // update inputted properties
  updateBudget() : void {
    this.budget.setMonthly(this.monthly);
    this.alert.create({
      message: 'Budget updated',
      duration: 1000
    }).present();
  }
}
