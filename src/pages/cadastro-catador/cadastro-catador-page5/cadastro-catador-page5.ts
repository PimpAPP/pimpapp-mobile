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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public catadoresProvider: CatadoresProvider) {
        this.catador = navParams.get('catador');
        console.log(this.catador);
    }

    printItem(){
        console.log(this.catador);
    }

    // Registra UsersAPI
    // Pega token e armazena no banco atual
    // De posse do token cadastra Catador 
        // Preisa ter resolvido a API para pegar automaticamente o user do token

    registerCatador(){
        let new_material_list = [];
        this.catador.materials_collected.forEach(
          item => { new_material_list.push(item.id)});
        this.catador.materials_collected = new_material_list;
        this.catadoresProvider.registerCatador(this.catador)
            .subscribe(data => {
                console.log(data);
            });
    }

}
