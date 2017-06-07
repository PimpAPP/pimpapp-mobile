import { TabsPage } from './../tabs/tabs';
import { Storage } from '@ionic/storage';
import { TutorialPage } from './../tutorial/tutorial';
import { LoginProvider } from './../../providers/login-provider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OAuthModule } from '../pages/oauth/oauth.module';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    public user: string;
    public password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public loginProvider: LoginProvider, public storage: Storage) {
    }

    // login(){
    //     if (!this.loginProvider.isLogedIn())
    //       this.loginProvider.makeLogin(this.user, this.password);
    // }

  gotoHome(){
    this.navCtrl.setRoot(TabsPage);
  }

}
