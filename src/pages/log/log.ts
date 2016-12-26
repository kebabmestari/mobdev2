import {Component} from "@angular/core";
import {NavController, ModalController, ToastController} from "ionic-angular";
import {ExpenseService} from "../../app/expense.service";
import {Expense} from "../../app/expense";

@Component({
  selector: 'page-log',
  templateUrl: 'log.html'
})
export class LogPage {

  // shown list, filtered with dates and reversed so newer ones are at the top
  filteredList: Expense[] = [];
  filterFrom: string = '';
  filterTo: string = '';

  // show filter dialog
  showFilter: boolean = false;

  constructor(public navCtrl: NavController, public expenses: ExpenseService, public modalCtrl: ModalController, public alert: ToastController) {
  }

  /**
   * Update the filtered list
   */
  updateList(): void {

    try {
      // convert the input string to date object and then to integer
      console.log(this.filterFrom, this.filterTo);
      let reg = /([0-9]+)-([0-9]+)-([0-9]+)/;

      let fromReg = reg.exec(this.filterFrom);
      let toReg = reg.exec(this.filterTo);

      let fromDate = new Date(+fromReg[1], +fromReg[2], +fromReg[3]);
      let toDate = new Date(+toReg[1], +toReg[2], +toReg[3]);

      var from: number = fromDate.getTime();
      var to: number = toDate.getTime();
    } catch(e) {
      // something not set, use defaults
    }

    // defaults
    if (!from)
      from = new Date(0, 0, 0).getTime();
    if (!to)
      to = new Date().getTime();

    // fetch the filtered list
    this.filteredList = this.expenses.getEntriesByTime(from, to).reverse();
    console.log('list updated ' + from + " " + to);

  }

  // update lists upon entering
  ionViewWillEnter() {
    this.updateList();
  }

  // delete an entry
  deleteEntry(e : Expense) {
    this.expenses.deleteExpense(e);
    this.updateList();
    this.alert.create({
      message: 'Entry deleted',
      duration: 2000
    }).present();
  }

  toggleShowFilter() {
    this.showFilter = !this.showFilter;
  }

}
