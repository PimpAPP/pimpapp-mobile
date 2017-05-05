import { Residue } from './../Residue';
import { QuantityPage } from './quantity/quantity';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MaterialRecover } from './../MaterialRecover';

@IonicPage()
@Component({
  templateUrl: 'residue-register.html',
})
export class ResidueRegister {
  private materialRecover: MaterialRecover;
  private residue: Residue; 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {
      this.materialRecover = new MaterialRecover();
      this.residue = new Residue();
  }

  showModalQuantity(material){
      let modal = this.modalCtrl.create(QuantityPage);

      let materialSelected = this.materialRecover.findMaterial(material);
      console.log(materialSelected);
      
      this.residue.materialList.push(materialSelected);
      console.log(this.residue);

      modal.present();
  }


}
