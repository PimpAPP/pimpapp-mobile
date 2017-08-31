import { ApiProvider } from '../../providers/api-provider';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
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

    catadorID: any = this.navParams.get("catadorID");
    catador: any;
    catadorDiasTrabalhados: any;
    material_list: any[] = [];
    materialRecover: MaterialRecover;
    catadorImg: string;
    minibioMaxSize: Number = 200;
    showCompleteMinibio: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public http: UsersAPI, public loading: LoadingController,
        public alertCtrl: AlertController, public callNumber: CallNumber,
        public apiProvider: ApiProvider, public storage: Storage) {        
        
        this.materialRecover = new MaterialRecover();
    }

    ionViewWillEnter() {
        //this.storage.get('id').then((val) => {
            let url = this.apiProvider.url + "api/catadores/" + this.catadorID + "/";
            //let url = this.apiProvider.url + "api/catadores/295/";
            //Prepara o loading
            let loader = this.loading.create({
                content: 'Por favor aguarde...',
            });

            loader.present().then(() => {
                this.http.get(url).subscribe(
                    data => {

                        this.catador = JSON.stringify(data);
                        this.catador = JSON.parse(this.catador);
                        console.log(this.catador);
                        this.showCompleteMinibio = (this.catador.minibio.length <= this.minibioMaxSize);

                        this.catadorImg = '';
                        let photoUrl = this.catador.profile_photo;
                        if (photoUrl) {
                            photoUrl = (photoUrl.startsWith('/')) ? 
                                    photoUrl.substr(1, photoUrl.length) : 
                                    photoUrl;
                            this.catadorImg = this.apiProvider.url + photoUrl;
                        }

                        if (this.catador.how_many_years_work != null) {
                            let inicio = new Date();
                            inicio.setFullYear(this.catador.how_many_years_work);
                            inicio.setMonth(1);
                            inicio.setHours(1);
                            let fim = new Date();

                            var timeDiff = Math.abs(fim.getTime() - inicio.getTime());
                            this.catadorDiasTrabalhados = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        } else {
                            this.catadorDiasTrabalhados = 0;
                        }
                        this.setMaterialList();
                    },
                    err => { }
                );
                loader.dismiss();
            });
       // });
    }

    setMaterialList() {
        let material_id: number;
        for (let i = 0; i < this.catador.materials_collected.length; i++) {
            material_id = this.catador.materials_collected[i];
            this.material_list.push(
                this.materialRecover.findMaterialId(this.catador.materials_collected[i]));
        }
    }

    lanchPhone(number: string) {
        this.callNumber.callNumber(number, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    learnMore() {
        this.showCompleteMinibio = !this.showCompleteMinibio;
    }

}
