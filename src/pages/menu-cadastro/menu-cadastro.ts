import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CadastroCatador } from './../cadastro-catador/cadastro-catador';
import { CadastroCatadorWebPage } from './../cadastro-catador-web/cadastro-catador-web';

/**
 * Generated class for the MenuCadastroComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'menu-cadastro',
    templateUrl: 'menu-cadastro.html'
})
export class MenuCadastroComponent {

    text: string;

    constructor(private navCtrl: NavController, public toastCtrl: ToastController) {}

    cadastroCatador() {
        this.navCtrl.push(CadastroCatador);
    }

    cadastroCooperativa() {
        this.toastCtrl.create({
            message: 'Em desenvolvimento',
            duration: 2000,
            position: 'bottom'
        }).present();    
    }

}
