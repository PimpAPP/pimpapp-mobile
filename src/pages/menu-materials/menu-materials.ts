import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'menu-materials',
  templateUrl: 'menu-materials.html',
})
export class MenuMaterials {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController) {
  }

}
