import { TutorialPage } from './../tutorial/tutorial';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import  { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoHome(){
    this.navCtrl.setRoot(TabsPage);
  }

}
