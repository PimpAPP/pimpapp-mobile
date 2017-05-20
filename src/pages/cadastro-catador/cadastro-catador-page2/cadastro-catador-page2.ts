import { CadastroCatadorPage3 } from './../cadastro-catador-page3/cadastro-catador-page3';
import { CadastroCatador } from './../cadastro-catador';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cadastro-catador-page2',
  templateUrl: 'cadastro-catador-page2.html',
})
export class CadastroCatadorPage2 {
  public myDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  openPage1(){
      this.navCtrl.push(CadastroCatador);
  }

  openPage3(){
      this.navCtrl.push(CadastroCatadorPage3);
  }

}