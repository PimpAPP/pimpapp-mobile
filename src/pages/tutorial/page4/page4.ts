import { TutorialPage5 } from './../page5/page5';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page4-tutorial',
  templateUrl: 'page4.html',
})
export class TutorialPage4 {

  constructor(public navCtrl: NavController) {
  }

  openPage3(){
    this.navCtrl.pop();
  }

  openPage5(){
    this.navCtrl.push(TutorialPage5);
  }

}
