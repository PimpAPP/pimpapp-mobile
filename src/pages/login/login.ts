import { LoginProvider } from './../../providers/login-provider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import  { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    public user: string;
    public password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public loginProvider: LoginProvider) {
    }

    login(){
        if (!this.loginProvider.isLogedIn())
          this.loginProvider.makeLogin(this.user, this.password);
    }

  gotoHome(){
    this.navCtrl.setRoot(TabsPage);
  }

}
