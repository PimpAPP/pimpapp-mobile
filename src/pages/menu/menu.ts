import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from 'ionic-angular';
import { TutorialPage } from './../tutorial/tutorial';
import { PerfilCatador } from './../perfil-catador/perfil-catador';
import { ErrorPage } from './../404/ErrorPage';

import { CatakiPage } from './../cataki/cataki';
import { PimpMyCarrocaPage } from './../pimpmycarroca/pimpmycarroca';
import { ParceirosPage } from './../parceiros/parceiros';
import { PraOndeVamosPage } from './../praondevamos/praondevamos';
import { ColaborePage } from './../colabore/colabore';
import { CadastroCatador } from './../cadastro-catador/cadastro-catador';
import { CadastroCatadorWebPage } from './../cadastro-catador-web/cadastro-catador-web';
import { MenuCadastroComponent } from './../menu-cadastro/menu-cadastro';
import { PerfilCooperativa } from './../perfil-cooperativa/perfil-cooperativa';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LangPage } from './../lang-page/lang-page';


@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {

    constructor(public navCtrl: NavController, 
        private splashScreen: SplashScreen, 
        private translate: TranslateService) {
            
    }

    openTutorial() {
        this.navCtrl.push(TutorialPage);
    }

    errorpage() {
        this.navCtrl.push(ErrorPage);
    }

    goCataki() {
        this.navCtrl.push(CatakiPage);
    }

    goPimpMyCarroca() {
        this.navCtrl.push(PimpMyCarrocaPage);
    }

    goParceiros() {
        this.navCtrl.push(ParceirosPage);
    }

    goParondeVamos() {
        this.navCtrl.push(PraOndeVamosPage);
    }

    goColabore() {
        this.navCtrl.push(ColaborePage);
    }
    
    cadastroCatador() {
        this.navCtrl.push(CadastroCatador);
    }

    cadastroCatadorWeb() {
        this.navCtrl.push(CadastroCatadorWebPage);
    }

    openCadastro() {
        this.navCtrl.push(MenuCadastroComponent);
    }

    openCatadorPage() {
        this.navCtrl.push(PerfilCatador);
    }

    openCooperativaPage() {
        this.navCtrl.push(PerfilCooperativa);
    }

    openSplash() {
        this.splashScreen.show();
    }
    
    openLangPage() {
        this.navCtrl.push(LangPage);
    }  

}
