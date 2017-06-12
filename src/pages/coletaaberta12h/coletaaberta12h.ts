import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-coletacberta12h',
  templateUrl: 'coletaaberta12h.html',
})
export class coletaaberta12h {

  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public loading: LoadingController, 
    public alertCtrl: AlertController) {
  }

}
