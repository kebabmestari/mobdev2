import {Component} from "@angular/core/src/metadata/directives";
import {ViewController, ToastController} from "ionic-angular";
import {ExpenseService} from "../../app/expense.service";

@Component({
  template: `<ion-header>
<ion-toolbar>
<ion-title>
Add new expense
</ion-title>
<ion-buttons start>
<button ion-button (click)="dismiss()">
<ion-icon name="close"></ion-icon>
</button>
</ion-buttons>
</ion-toolbar>
</ion-header>

<ion-content padding>
<ion-item>
  <ion-label>Amount(EUR)*</ion-label>
  <ion-input type="number" min="0" [(ngModel)]="amount"></ion-input>
</ion-item>
<ion-item>
  <ion-label>Description*</ion-label>
  <ion-input type="text" [(ngModel)]="description"></ion-input>
</ion-item>
<ion-item>
  <ion-label>Place</ion-label>
  <ion-input type="text" [(ngModel)]="place"></ion-input>
</ion-item>
<ion-item style="color: rgba(255,0,0,0.5)">* required fields</ion-item>
<ion-item style="margin-top: 10px">
<button ion-button block (click)="addEntry()">Add</button>
</ion-item>
</ion-content>`
})
export class AddEntry {

  // input models
  amount: number = 0;
  description: string = '';
  place: string = '';

  constructor(public viewCtrl: ViewController, public expenses: ExpenseService, public alert: ToastController) {
  }

  // dismiss the modal controller
  dismiss() {
    this.viewCtrl.dismiss();
  }

  // add a new expense entry
  addEntry() : void {
    if(this.amount === 0 || this.description.length === 0) {
      this.alert.create({
        message: 'Set the amount and description',
        duration: 2000
      }).present();
      return;
    }
    this.expenses.createExpense(this.amount, this.description, this.place);
    this.amount = 0;
    this.description = this.place = '';
    this.dismiss();
    this.alert.create({
      message: 'Entry created',
      duration: 2000
    }).present();
  }
}
