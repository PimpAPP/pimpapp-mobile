import { UsersAPI } from './../../providers/users-api';
import { CadastroGerador } from './../cadastro-gerador/cadastro-gerador';
import { CadastroCatador } from './../cadastro-catador/cadastro-catador';
import { LoginPage } from './../login/login';
import { TutorialPage } from './../tutorial/tutorial';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userProvider: UsersAPI) {
  }

  openTutorial(){
      this.navCtrl.push(TutorialPage);
  }

  openLogin(){
    this.navCtrl.push(LoginPage);
  }

  openCadastroGerador(){
    this.navCtrl.push(CadastroGerador);
  }

  openCadastroCatador(){
    this.navCtrl.push(CadastroCatador)
  }

  registerUser(){
      this.userProvider.post({
          username: 'oi', email: 'a@a.com',
          first_name: 'first name'
      }).subscribe((data) =>{
          console.log(data);
      });
  }

}
