import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-coletacberta',
  templateUrl: 'coletaaberta.html',
})
export class ColetaAberta {

  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public loading: LoadingController, 
    public alertCtrl: AlertController) {
  }

leftArrow(){
    console.log("Left Arrow");
}

}
