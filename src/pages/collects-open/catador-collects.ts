import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'collects-open',
  templateUrl: 'collects-open.html',
})
export class CollectsOpen {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
