import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-new-residue',
  templateUrl: 'new-residue.html',
})
export class NewResidue {

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController) {
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
