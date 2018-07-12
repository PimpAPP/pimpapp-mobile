import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ErrorPage } from './../404/ErrorPage';
import { CadastroCatador } from './../cadastro-catador/cadastro-catador';


@Component({
    selector: 'menu-support',
    templateUrl: 'menu-support.html',
})
export class MenuSupport {

    constructor(public navCtrl: NavController) {
    }

    errorpage() {
        this.navCtrl.push(ErrorPage);
    }

    openCadastroCatador() {
        this.navCtrl.push(CadastroCatador);
    }

}
