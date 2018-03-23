import { ApiProvider } from '../../providers/api-provider';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController, Content } from 'ionic-angular';
import { MaterialRecover } from './../MaterialRecover';
import { CallNumber } from '@ionic-native/call-number';

import { UsersAPI } from '../../providers/users-api';

@Component({
    selector: 'page-perfil-cooperativa',
    templateUrl: 'perfil-cooperativa.html',
})
export class PerfilCooperativa {

    @ViewChild(Content) content: Content;

    cooperativaID: any = this.navParams.get("cooperativaID");
    // cooperativaID: any = 20;
    // cooperativaID: any = 10;
    cooperativa: any;
    cooperativaDiasTrabalhados: any;
    material_list: any[] = [];
    materialRecover: MaterialRecover;
    cooperativaImg: string;
    noImageSrc = 'assets/img/no_image.jpg';
    historyMaxSize: Number = 200;
    showCompleteHistory: boolean = false;
    whatsapp: any;


    constructor(public navCtrl: NavController, public navParams: NavParams,
        public http: UsersAPI, public loading: LoadingController,
        public alertCtrl: AlertController, public apiProvider: ApiProvider,
        public callNumber: CallNumber) {

        this.materialRecover = new MaterialRecover();
    }

    ngAfterViewInit() {
        if (this.cooperativaID) {
            this.update();
        }    
    }

    update() {
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
                    this.cooperativaImg = this.noImageSrc;
                    let photoUrl = this.cooperativa.profile_photo;

                    if (photoUrl) {
                        photoUrl = (photoUrl.startsWith('/')) ? 
                                photoUrl.substr(1, photoUrl.length) : 
                                photoUrl;
                        this.cooperativaImg = this.apiProvider.url + photoUrl;
                    }

                    this.material_list = [];
                    for (let i = 0; i < this.cooperativa.materials_collected.length; i++) {
                        this.material_list.push(
                            this.materialRecover.findMaterialId(this.cooperativa.materials_collected[i]));
                    }

                    if (this.cooperativa 
                            && this.cooperativa.phones 
                            && this.cooperativa.phones[0] 
                            && this.cooperativa.phones[0].phone) {
                        this.whatsapp = this.cooperativa.phones[0].phone;
                        this.whatsapp = this.whatsapp
                                .replace(' ', '') 
                                .replace('(', '')
                                .replace(')', '')
                                .replace('-', '');
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

    updateData(id) {
        this.cooperativaID = id;
        this.scrollToTop();
        this.update();
    }

    scrollToTop() {
        this.content.scrollToTop();
        
        setTimeout(function() {
            var div = document.querySelector('#perfil-cooperativa-content > div.scroll-content');
            div.scrollTop = 0;
        });
    }

    launchPhone(number: string) {
        this.callNumber.callNumber(number, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    readMore() {
        this.showCompleteHistory = !this.showCompleteHistory;
    }

    formatDate(date) {
        if (!date) return;
        var parts = date.split('-');        
        return parts[2] + '/' + parts[1] + '/' + parts[0];
    }

    getModifiedDate() {
        var options = {  
            year: "numeric", 
            month: "short",  
            day: "numeric"  
        }; 

        if (this.cooperativa) {
            var date = new Date(this.cooperativa.modified_date);
            return date.toLocaleDateString("pt-br", options);
        } else {
            return '';
        }        
    }

    openUpdatePage() {
        var url = 'http://www.cataki.org/#/cooperativa/' + this.cooperativa.id;
        // var url = 'http://localhost:4200/#/cooperativa/' + this.cooperativa.id;
        window.open(url, '_system', 'location=yes');
    }

}
