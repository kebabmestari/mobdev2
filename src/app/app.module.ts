import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {FrontPage, TutorialSlides} from '../pages/front/front';
import {LogPage} from '../pages/log/log';
import {SettingsPage} from '../pages/settings/settings';
import {TabsPage} from '../pages/tabs/tabs';
import {BudgetService} from "./budget.service";
import {ExpenseService} from "./expense.service";
import {AddEntry} from "../pages/front/addentry";

@NgModule({
  declarations: [
    MyApp,
    FrontPage,
    LogPage,
    SettingsPage,
    TabsPage,
    AddEntry,
    TutorialSlides
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FrontPage,
    LogPage,
    SettingsPage,
    TabsPage,
    AddEntry,
    TutorialSlides
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BudgetService,
    ExpenseService
  ]
})
export class AppModule {
}
