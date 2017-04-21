import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { UsersAPI } from '../../providers/users-api';
import { CatadorPage } from '../catador/catador';

/*
  Generated class for the Catadores page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-catadores',
  templateUrl: 'catadores.html'
})
export class CatadoresPage {

  catadores: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: UsersAPI, public loading: LoadingController) {
    this.http;
  }

  ionViewDidLoad() {
    
    let url = "http://179.188.38.243/api/catadores/";

    //Prepara o loading
    let loader = this.loading.create({
        content: 'Por favor aguarde...',
    });

      loader.present().then(() => {
          this.http.get(url).subscribe(
            data => {

              this.catadores = data.results;

              console.log("RETORNO DE OBJETO: " + JSON.stringify(this.catadores));

            },
            err => {

              
              
            }
          );
          loader.dismiss();
        });

  }

    mostrarCatador(catador_id) {

      this.navCtrl.push(CatadorPage, {
        'catador_id' : catador_id
      });

    }

}
