import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TabsPage } from './../../tabs/tabs';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'page-list-catadores',
  templateUrl: 'list-catadores-near.html',
})
export class ListCatadoresNear {

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController, public callNumber: CallNumber) {
  }

  lanchPhone(number: string){
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  goHome(){
     this.navCtrl.push(TabsPage);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
