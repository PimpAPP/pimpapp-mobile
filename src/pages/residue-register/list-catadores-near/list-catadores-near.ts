import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TabsPage } from './../../tabs/tabs';

@Component({
  selector: 'page-list-catadores',
  templateUrl: 'list-catadores-near.html',
})
export class ListCatadoresNear {

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController) {
  }

  goHome(){
     this.navCtrl.push(TabsPage);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
