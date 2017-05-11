import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { UsersAPI } from '../../providers/users-api';

/**
 * Generated class for the PerfilCooperativa page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-perfil-cooperativa',
  templateUrl: 'perfil-cooperativa.html',
})
export class PerfilCooperativa {

  //cooperativaID: any = this.navParams.get("cooperativaID");
  cooperativaID: any = 1;
  cooperativa: any;
  cooperativaDiasTrabalhados: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: UsersAPI, public loading: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {

    let url = "http://179.188.38.243/api/cooperatives/" + this.cooperativaID + "/";

    //Prepara o loading
    let loader = this.loading.create({
        content: 'Por favor aguarde...',
    });

      loader.present().then(() => {
          this.http.get(url).subscribe(
            data => {

              this.cooperativa = JSON.stringify(data);
              this.cooperativa = JSON.parse(this.cooperativa);

              let inicio = new Date(this.cooperativa.works_since);

              if(inicio != null) {

                let fim = new Date();

                let tempoTrabalhado = Math.abs(fim.getDate() - inicio.getDate());
                this.cooperativaDiasTrabalhados =  Math.ceil(tempoTrabalhado / (1000 * 3600 * 24));

              } else {

                this.cooperativaDiasTrabalhados = 0;

              }

              console.log("Catador: " + JSON.stringify(this.cooperativa)); 
 
            },
            err => {

              
              
            }
          );
          loader.dismiss();
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilCooperativa');
  }

}
