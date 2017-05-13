import { TutorialPage } from './../tutorial/tutorial';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openTutorial(){
    this.navCtrl.push(TutorialPage);
  }

}
