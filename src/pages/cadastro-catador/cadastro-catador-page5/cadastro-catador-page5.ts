import { CadastroCatadorPage4 } from './../cadastro-catador-page4/cadastro-catador-page4';
import { Storage } from '@ionic/storage';
import { LoginPage } from './../../login/login';
import { UsersAPI } from './../../../providers/users-api';
import { CatadoresProvider } from './../../../providers/catadores-provider';
import { Catador } from './../../catador';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cadastro-catador-page5',
  templateUrl: 'cadastro-catador-page5.html',
})
export class CadastroCatadorPage5 {
  public myDate: any;
  public catador: Catador = new Catador();
  public user: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public catadoresProvider: CatadoresProvider,
    public userProvider: UsersAPI, public storage: Storage) {
        this.catador = navParams.get('catador');
        console.log(this.catador);
    }

    printItem(){
        console.log(this.catador);
    }

    // Registra UsersAPI
    // Pega token e armazena no banco atual
    // De posse do token cadastra Catador 
        // Precisa ter resolvido a API para pegar automaticamente o user do token

    registerUser(){
        this.userProvider.post({
            username: this.catador.username, email: this.catador.email,
            first_name: this.catador.name, password: this.catador.password
        }).subscribe(data=>{
            console.log(data);
            this.storage.set('user', data );
            this.catador.user = data.id;
            this.catador.nickname = this.catador.username;
            // Remove this when the Api get fixed
            // this.catador.profile_photo = 'asdfasfasfsad'
            this.registerCatador();
        });
    }

    registerCatador(){
        let new_material_list = [];
        this.catador.materials_collected.forEach(
          item => { new_material_list.push(item.id)});
        this.catador.materials_collected = new_material_list;
        this.catadoresProvider.registerCatador(this.catador)
        .subscribe(data => {
            console.log(data);
            this.storage.set('catador', data );
            this.navCtrl.push(LoginPage);
        });
    }

    openPage4(){
        this.navCtrl.push(CadastroCatadorPage4);
    }

}
