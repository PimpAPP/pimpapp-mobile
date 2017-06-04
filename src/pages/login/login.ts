import { Storage } from '@ionic/storage';
import { TutorialPage } from './../tutorial/tutorial';
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
    public error: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public loginProvider: LoginProvider, public storage: Storage) {
    }

    login(){
        let a: any;
        a = this.loginProvider.loginAPI(this.user, this.password).subscribe((data)=>{
            this.storage.set('token', data.token);
            this.storage.get('firstAccess').then((val) =>{
                if (!val)
                    this.navCtrl.push(TutorialPage);
                else 
                    this.navCtrl.push(TabsPage);
            });
            this.navCtrl.push(TabsPage);
        }, err => {
            this.error = 'Falha ao logar, verifique suas informações e tente novamente';
        });
    }

  gotoHome(){
    this.navCtrl.setRoot(TabsPage);
  }

}
