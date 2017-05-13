import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { UsersAPI } from '../../providers/users-api';

@IonicPage()
@Component({
  selector: 'page-perfil-catador',
  templateUrl: 'perfil-catador.html',
})
export class PerfilCatador {

  //catadorID: any = this.navParams.get("catadorID");
  catadorID: any = 8;
  catador: any;
  catadorDiasTrabalhados: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: UsersAPI, public loading: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {

    let url = "http://179.188.38.243/api/catadores/" + this.catadorID + "/";

    //Prepara o loading
    let loader = this.loading.create({
        content: 'Por favor aguarde...',
    });

      loader.present().then(() => {
          this.http.get(url).subscribe(
            data => {

              this.catador = JSON.stringify(data);
              this.catador = JSON.parse(this.catador);

              let inicio = new Date(this.catador.works_since);

              if(inicio != null) {

                let fim = new Date();

                let tempoTrabalhado = Math.abs(fim.getDate() - inicio.getDate());
                this.catadorDiasTrabalhados =  Math.ceil(tempoTrabalhado / (1000 * 3600 * 24));

              } else {

                this.catadorDiasTrabalhados = 0;

              }

              console.log("Catador: " + JSON.stringify(this.catador)); 
 
            },
            err => {

              
              
            }
          );
          loader.dismiss();
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilCatador');
  }

}
