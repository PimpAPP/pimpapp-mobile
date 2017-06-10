import { LoginPage } from './../login/login';
import { UsersAPI } from './../../providers/users-api';
import { Gerador } from './../Gerador';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cadastro-gerador',
  templateUrl: 'cadastro-gerador.html',
})
export class CadastroGerador {
  public error: string = '';
  public gerador: Gerador;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userProvider: UsersAPI) {
      this.gerador = new Gerador();
  }

  cadastrarGerador(){
    this.userProvider.post({
            username: this.gerador.username, email: this.gerador.email,
            first_name: this.gerador.name, password: this.gerador.password
        }).subscribe(data=>{
            this.navCtrl.push(LoginPage);
      }, err =>{
         console.log(err);
         this.error = err._body;
      });
  }


}
