import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TutorialPage2 } from './page2/page2';


@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  constructor(public navCtrl: NavController) {
  }

  openPage2(){
    this.navCtrl.push(TutorialPage2);
  }


}
