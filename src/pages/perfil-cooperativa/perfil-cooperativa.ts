import { ApiProvider } from '../../providers/api-provider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MaterialRecover } from './../MaterialRecover';

import { UsersAPI } from '../../providers/users-api';

@Component({
    selector: 'page-perfil-cooperativa',
    templateUrl: 'perfil-cooperativa.html',
})
export class PerfilCooperativa {

    //cooperativaID: any = this.navParams.get("cooperativaID");
    cooperativaID: any = 1;
    cooperativa: any;
    cooperativaDiasTrabalhados: any;
    material_list: any[] = [];
    materialRecover: MaterialRecover;
    cooperativaImg: string;
    noImageSrc = 'assets/img/no_image.jpg';

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public http: UsersAPI, public loading: LoadingController,
        public alertCtrl: AlertController, public apiProvider: ApiProvider) {

        this.materialRecover = new MaterialRecover();
    }

    ionViewWillEnter() {
        let url = this.apiProvider.url + "api/cooperatives/" + this.cooperativaID + "/";

        //Prepara o loading
        let loader = this.loading.create({
            content: 'Por favor aguarde...',
        });

        loader.present().then(() => {
            this.http.get(url).subscribe(
                data => {
                    this.cooperativa = JSON.stringify(data);
                    this.cooperativa = JSON.parse(this.cooperativa);
                    console.log(this.cooperativa);
                    this.cooperativaImg = this.apiProvider.url + this.cooperativa.image;

                    this.material_list = [];
                    for (let i = 0; i < this.cooperativa.materials_collected.length; i++) {
                        this.material_list.push(
                            this.materialRecover.findMaterialId(this.cooperativa.materials_collected[i]));
                    }

                    this.http.get(url + 'partners/').subscribe(res=>{
                        var partners = res;
                        if (partners) {
                            for (var i=0; i<=partners.length; i++) {
                                if (!partners[i] || !partners[i].image) continue;
                                if (partners[i].image.startsWith('/')) {
                                    partners[i].image = partners[i].image.slice(1);
                                }
                            }
                        }
                        this.cooperativa.partners = partners;
                    });
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

    generateArray(obj){
        if (!obj) return [];
        return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
    }

    photoOnError() {
        this.cooperativaImg = this.noImageSrc;
    }

    scrollSlideToRight(id) {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft + 
                (document.getElementsByClassName('material-slide-item')[0]['offsetWidth'] * 4);
    }

    scrollSlideToLeft(id) {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft - 
                (document.getElementsByClassName('material-slide-item')[0]['offsetWidth'] * 4);
    }

}
