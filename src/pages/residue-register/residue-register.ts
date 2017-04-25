import { QuantityPage } from './quantity/quantity';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'residue-register.html',
})
export class ResidueRegister {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  showModalQuantity(){
      let modal = this.modalCtrl.create(QuantityPage);
      modal.present();
  }

}
