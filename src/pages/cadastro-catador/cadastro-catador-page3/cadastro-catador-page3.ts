import { Catador } from './../../catador';
import { CadastroCatadorPage4 } from './../cadastro-catador-page4/cadastro-catador-page4';
import { CadastroCatadorPage2 } from './../cadastro-catador-page2/cadastro-catador-page2';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cadastro-catador-page3',
  templateUrl: 'cadastro-catador-page3.html',
})
export class CadastroCatadorPage3 {
  public myDate: any;
    public catador: Catador;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.catador = navParams.get('catador');
      console.log(this.catador);
  }

  openPage2(){
      this.navCtrl.push(CadastroCatadorPage2, {catador: this.catador})
  }

  openPage4(){
      this.navCtrl.push(CadastroCatadorPage4, {catador: this.catador});
  } 

}
