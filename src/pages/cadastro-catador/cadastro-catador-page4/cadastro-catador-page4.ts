import { MaterialItem } from './../../MaterialItem';
import { MaterialRecover } from './../../MaterialRecover';
import { Catador } from './../../catador';
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
  public catador: Catador = new Catador();
  public materialRecover: MaterialRecover = new MaterialRecover();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.catador = navParams.get('catador');
      console.log(this.catador);
  }

    selectMaterial(material){
      let materialSelected = this.materialRecover.findMaterial(material);
      this.catador.addMaterialOrRemoveIfAlreadyIncluded(materialSelected);
      console.log(this.catador);
    }

    openPage3(){
        this.navCtrl.push(CadastroCatadorPage3, {catador: this.catador});
    }

    openPage5(){
        this.navCtrl.push(CadastroCatadorPage5, {catador: this.catador});
    }

}
