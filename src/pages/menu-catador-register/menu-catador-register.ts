import { CadastroCatador } from './../cadastro-catador/cadastro-catador';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'menu-catador-register',
  templateUrl: 'menu-catador-register.html',
})
export class MenuCatadorRegister {

    constructor(public navCtrl: NavController) {
    }

    catadorRegister(){
      this.navCtrl.push(CadastroCatador);
    }

}
