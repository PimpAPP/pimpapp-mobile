import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from './../../tabs/tabs';


@Component({
  selector: 'page5-tutorial',
  templateUrl: 'page5.html',
})
export class TutorialPage5 {

  constructor(public navCtrl: NavController) {
  }


  goHome(){
    this.navCtrl.push(TabsPage);
  }


}
