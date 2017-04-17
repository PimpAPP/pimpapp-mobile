import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-catador-collects',
  templateUrl: 'catador-collects.html',
})
export class CatadorCollects {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
