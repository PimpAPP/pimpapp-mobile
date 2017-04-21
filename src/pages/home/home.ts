import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { CadastroPage } from '../cadastro/cadastro';

//TEMPORARIO
import { MapaPage } from '../mapa/mapa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: [
    'shared/css/webflow.css',
    'shared/css/normalize.css',
    'shared/css/reco-f55819.webflow.css'
  ]
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

    goToLogin() {

      this.navCtrl.push(LoginPage);

    }

    goToCadastro() {

      this.navCtrl.push(CadastroPage);

    }

}
