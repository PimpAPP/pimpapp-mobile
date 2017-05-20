import { CadastroCatadorPage5 } from './../cadastro-catador-page5/cadastro-catador-page5';
import { CadastroCatadorPage3 } from './../cadastro-catador-page3/cadastro-catador-page3';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cadastro-catador-page4',
  templateUrl: 'cadastro-catador-page4.html',
})
export class CadastroCatadorPage4 {
  public myDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  openPage3(){
      this.navCtrl.push(CadastroCatadorPage3);
  }

  openPage5(){
      this.navCtrl.push(CadastroCatadorPage5);
  }

}
