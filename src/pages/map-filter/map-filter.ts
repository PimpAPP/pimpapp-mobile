import { MaterialRecover } from './../MaterialRecover';
import { AlertController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { SearchFilter } from '../search-filter';
import { Keyboard } from '@ionic-native/keyboard';
import { Renderer } from '@angular/core';
import { UtilDataService } from '../../services/util-data.service';


@Component({
    selector: 'map-filter',
    templateUrl: 'map-filter.html',
})
export class MapFilter {

    
    searchFilter = new SearchFilter();
    callBackFunction: any;
    public stateList: any;
    public cityList: any;
    materialsList = {
        misturado: false,
        papel: false,
        lata: false,
        plastico: false,
        vidro: false,
        metal: false,
        oleo: false,
        moveis: false,
        eletronico: false,
        entulho: false,
        bateria: false,
        outros: false
    };
    public showMaterials = false;


    constructor(public navCtrl: NavController, 
            params: NavParams, 
            private alertCtrl: AlertController,
            public materialRecover: MaterialRecover,
            public keyboard: Keyboard, 
            public renderer: Renderer,
            public utilDataService: UtilDataService) {
        
        this.searchFilter = params.get('searchFilter');
        this.callBackFunction = params.get('callback');

        // Fill materialsList
        if (this.searchFilter.materials.length > 0) {
            for (var x=0; x<this.searchFilter.materials.length; x++){
                let material = this.materialRecover.findMaterialId(this.searchFilter.materials[x]);
                this.materialsList[this.replaceSpecialChars(material['name'].toLowerCase())] = true;
            }

            this.showMaterials = true
        } else {
            this.showMaterials = false;
        }

        this.utilDataService.getStateAndCityList().subscribe((res) => {
            // this.startCityAndStateSelect();
            this.stateList = res;
            this.onSelectState(this.searchFilter.state);
        });

    }

    onSelectState(name: any) {
        this.cityList = [];
        for (var x=0; x<this.stateList.length; x++) {
            var state = this.stateList[x];

            if (state['nome'] == name) {
                this.cityList = state['cidades'];
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
        this.searchFilter.clean();
        this.materialsList = {
            misturado: false,
            papel: false,
            lata: false,
            plastico: false,
            vidro: false,
            metal: false,
            oleo: false,
            moveis: false,
            eletronico: false,
            entulho: false,
            bateria: false,
            outros: false
        }

        setTimeout(() => {
            this.searchFilter.materials = [];
        }, 200);
    }

    selectMaterial(material) {
        let materialSelected = this.materialRecover.findMaterial(material);
        this.searchFilter.addMaterialOrRemoveIfAlreadyIncluded(materialSelected);
    }

    searchKeyPress(e) {
        // console.log(e.keyCode);
        if (e.keyCode == 13) {
            // this.keyboard.close();
            this.renderer.invokeElementMethod(e.target, 'blur');
        }
    }
    
}
