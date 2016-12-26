import { Component } from '@angular/core';

import {NavController, ModalController, ViewController, ToastController} from 'ionic-angular';
import {BudgetService} from "../../app/budget.service";
import {ExpenseService} from "../../app/expense.service";
import {AddEntry} from "./addentry";

@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class FrontPage {

  // show welcome message or not
  private firstBoot: boolean = true;

  // budgets
  private dailyBudget: number = 0;
  private weeklyBudget: number = 0;
  private monthlyBudget: number = 0;

  // spendings
  private todaySpendings: number = 0;
  private weeklySpendings: number = 0;
  private monthSpendings: number = 0;

  private overDailyBudget: boolean = false;
  private overWeeklyBudget: boolean = false;
  private overMonthlyBudget: boolean = false;

  //constructor
  constructor(public navCtrl: NavController, public budget : BudgetService, public expenses : ExpenseService, public modalCtrl : ModalController, public alert: ToastController) {

  }

  // update stats on entering the page
  ionViewWillEnter() {
    this.update();
    if(this.firstBoot) {
      this.modalCtrl.create(TutorialSlides).present();
      this.firstBoot = false;
    }
  }

  // run all necessary updates
  update() {
    this.updateBudgets();
    this.updateSpendings();
    this.overDailyBudget = this.todaySpendings > this.dailyBudget;
    this.overWeeklyBudget = this.weeklySpendings > this.weeklyBudget;
    this.overMonthlyBudget = this.monthSpendings > this.monthlyBudget;
  }

  // update budgets
  updateBudgets() {
    this.dailyBudget = this.budget.getDaily();
    this.weeklyBudget = this.budget.getWeekly();
    this.monthlyBudget = this.budget.getMonthly();
  }

  // update spendings
  updateSpendings() {
    this.todaySpendings = this.expenses.getSpendingsToday();
    this.weeklySpendings = this.expenses.getSpendingsWeek();
    this.monthSpendings = this.expenses.getSpendingsMonth();
  }

  // show a dialog to add new expense entry
  addNew() {
    if(this.dailyBudget === 0 || this.monthlyBudget === 0) {
      this.alert.create({
        message: 'Set you budget first!',
        duration: 2000
      }).present();
      return;
    }
    let modal = this.modalCtrl.create(AddEntry);
    modal.present();
    modal.onWillDismiss(()=>{this.update()});
  }
}

// Welcome message modal
@Component({
  template: `
<ion-content>
<ion-slides pager>
  <ion-slide style="overflow:hidden">
    <img src="assets/piggybank.jpeg" style="width:40%; height:40%;">
    <p>Welcome to ExpenseDiary</p>
    <p>This is a simple application to help you maintain your daily spendings and provide easy expense logging and budget tracking capabilities for your daily spendings</p>
    <p><i>Swipe right for more information</i></p>
  </ion-slide>
  <ion-slide>
    <p>Start by clicking the 'budget' tab at the bottom of the page and set your budget that you want to follow</p>
    <p>After that, you can add your smaller or larger daily spendings by tapping the ADD ENTRY button at the top right of the frontpage</p>
    <p>Front page also shows your daily and monthly spendings, log page allows you to view and search past entries by inputting a date range</p>
  </ion-slide>
</ion-slides>
</ion-content>
<ion-footer>
<ion-buttons end>
<button ion-button (click)="closeTutorial()">Skip</button>
</ion-buttons>
</ion-footer>
`
})
export class TutorialSlides {
  constructor(public viewCtrl: ViewController) {
  }
  closeTutorial() {
    this.viewCtrl.dismiss();
  }
}
