import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { UsersAPI } from '../../providers/users-api';

/*
  Generated class for the Catador page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-catador',
  templateUrl: 'catador.html'
})
export class CatadorPage {

  userID: any;
  catador: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: UsersAPI, public loading: LoadingController) {
    this.http;
    this.userID = this.navParams.get("catador_id");
  }

  ionViewDidLoad() {

    let url = "http://179.188.38.243/api/catadores/" + this.userID + "/";

    //Prepara o loading
    let loader = this.loading.create({
        content: 'Por favor aguarde...',
    });

      loader.present().then(() => {
          this.http.get(url).subscribe(
            data => {

              this.catador = data.results;

              console.log("RETORNO CATADOR: " + data.results);

            },
            err => {

              
              
            }
          );
          loader.dismiss();
        });
  }

    

}
