import { ApiProvider } from '../../providers/api-provider';
//import { CallNumber } from '@ionic-native/call-number';
import { MaterialRecover } from './../MaterialRecover';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { UsersAPI } from '../../providers/users-api';

@Component({
  selector: 'page-perfil-catador',
  templateUrl: 'perfil-catador.html',
})
export class PerfilCatador {

  //catadorID: any = this.navParams.get("catadorID");
  catadorID: any = 8;
  catador: any;
  catadorDiasTrabalhados: any;
  material_list: any[] = [];
  materialRecover: MaterialRecover;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: UsersAPI, public loading: LoadingController, 
    public alertCtrl: AlertController, //public callNumber: CallNumber,
    public apiProvider: ApiProvider) {
      this.materialRecover = new MaterialRecover();
  }

  ionViewWillEnter() {

    let url = this.apiProvider.url + "api/catadores/" + this.catadorID + "/";

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
              this.setMaterialList(); 
            },
            err => {}
          );
          loader.dismiss();
        });
  }

  setMaterialList(){
      let material_id: number;
      for (let i=0; i<this.catador.materials_collected.length; i++){
          material_id = this.catador.materials_collected[i];
          this.material_list.push(
            this.materialRecover.findMaterialId(this.catador.materials_collected[i]));
      }
  }

  lanchPhone(number: string){
    // this.callNumber.callNumber(number, true)
    //   .then(() => console.log('Launched dialer!'))
    //   .catch(() => console.log('Error launching dialer'));
  }

}
