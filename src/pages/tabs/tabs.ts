import {Component} from "@angular/core";
import {LogPage} from "../log/log";
import {FrontPage} from "../front/front";
import {SettingsPage} from "../settings/settings";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FrontPage;
  tab2Root: any = LogPage;
  tab3Root: any = SettingsPage;

  constructor() {

  }
}
