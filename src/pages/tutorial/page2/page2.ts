import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TutorialPage3 } from './../page3/page3';


@Component({
  selector: 'page2-tutorial',
  templateUrl: 'page2.html',
})
export class TutorialPage2 {

  constructor(public navCtrl: NavController) {
  }

  openPage1(){
    this.navCtrl.pop();
  }

  openPage3(){
    this.navCtrl.push(TutorialPage3);
  }

}
