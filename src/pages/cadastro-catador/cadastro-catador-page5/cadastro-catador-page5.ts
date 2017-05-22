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
    public navParams: NavParams) {
        this.catador = navParams.get('catador');
        console.log(this.catador);
    }

    printItem(){
        console.log(this.catador);
    }

}
