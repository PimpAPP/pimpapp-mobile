import { Feedback } from './../pages/feedback/feedback';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TutorialPage } from './../pages/tutorial/tutorial';
// import { TabsPage } from './../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild('c') nav: NavController;

  rootPage:any = TutorialPage;
  public menu: MenuController;

  constructor(platform: Platform, statusBar: StatusBar, public menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
    });

  }

  openPage(page){
    switch (page) {
      case 'feedback':
      this.nav.push(Feedback);
      this.menuCtrl.close();
      break;
    }
  }
}

