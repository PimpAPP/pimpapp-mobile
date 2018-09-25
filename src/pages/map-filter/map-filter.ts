import { MaterialRecover } from './../MaterialRecover';
import { AlertController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { SearchFilter } from '../search-filter';


@Component({
    selector: 'map-filter',
    templateUrl: 'map-filter.html',
})
export class MapFilter {

    searchFilter = new SearchFilter();
    callBackFunction: any;
    materialsList = []

    constructor(public navCtrl: NavController, 
            params: NavParams, 
            private alertCtrl: AlertController,
            public materialRecover: MaterialRecover) {
        
        this.searchFilter = params.get('searchFilter');
        this.callBackFunction = params.get('callback');

        // Fill materialsList
        if (this.searchFilter.materials.length > 0) {
            for (var x=0; x<this.searchFilter.materials.length; x++){
                let material = this.materialRecover.findMaterialId(this.searchFilter.materials[x]);
                this.materialsList.push(material['name']);
            }
        }

    }

    ok() {
        if (this.searchFilter.search && (
                !this.searchFilter.name && 
                !this.searchFilter.nickname &&
                !this.searchFilter.address)) {

            let alert = this.alertCtrl.create({
                title: 'Atenção',
                subTitle: 'Por favor selecione pelo menos um filtro (Nome, Apelido ou Endereço)',
                buttons: ['Ok']
            });
            alert.present();
            return;
        }

        this.searchFilter.materials = [];
        this.materialsList.forEach(material => {
            this.selectMaterial(this.replaceSpecialChars(material.toLowerCase()));
        });

        // this.viewCtrl.dismiss(this.searchFilter);
        this.callBackFunction(this.searchFilter).then(()=>{
            this.navCtrl.pop();
        });
    }

    replaceSpecialChars(text) {
        text = text.toLowerCase();                                                         
        text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
        text = text.replace(new RegExp('[Ç]','gi'), 'c');
        return text;  
    }

    clean() {
        this.searchFilter = new SearchFilter();
        this.searchFilter.search = '';
        this.materialsList = [];
    }

    selectMaterial(material) {
        let materialSelected = this.materialRecover.findMaterial(material);
        this.searchFilter.addMaterialOrRemoveIfAlreadyIncluded(materialSelected);
    }
    
}
