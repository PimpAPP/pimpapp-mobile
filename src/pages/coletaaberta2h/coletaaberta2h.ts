import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-coletacberta2h',
  templateUrl: 'coletaaberta2h.html',
})
export class ColetaAberta2h {

  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public loading: LoadingController, 
    public alertCtrl: AlertController) {
  }


}
