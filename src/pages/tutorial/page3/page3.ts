import { TutorialPage4 } from './../page4/page4';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page3-tutorial',
  templateUrl: 'page3.html',
})
export class TutorialPage3 {

  constructor(public navCtrl: NavController) {
  }

  openPage2(){
    this.navCtrl.pop();
  }

  openPage4(){
    this.navCtrl.push(TutorialPage4);
  }

}
