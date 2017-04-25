import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';


@Component({
  selector: 'page-new-residue',
  templateUrl: 'new-residue.html',
})
export class NewResidue {

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  showModalQuantity(){
      // let modal = this.modalCtrl.create(QuantityPage);
      // modal.present();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
