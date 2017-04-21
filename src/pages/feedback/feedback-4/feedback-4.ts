import { Feedback2 } from './../feedback-2/feedback-2';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-feedback-4',
  templateUrl: 'feedback-4.html',
})
export class Feedback4 {

  constructor(public navCtrl: NavController) {
  }

  openFeedback2(){
      this.navCtrl.push(Feedback2);
  }

}
