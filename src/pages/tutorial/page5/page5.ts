import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from './../../tabs/tabs';


@Component({
  selector: 'page5-tutorial',
  templateUrl: 'page5.html',
})
export class TutorialPage5 {

    constructor(public navCtrl: NavController, public storage: Storage) {
    }

    goHome(){
      this.storage.set('firstAccess', 1);
      this.navCtrl.push(TabsPage);
    }


}
