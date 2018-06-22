import { Component } from '@angular/core';
import { HomePage } from './../home/home';
import { CadastroCatadorWebPage } from './../cadastro-catador-web/cadastro-catador-web';
import { MenuPage } from './../menu/menu';
import { MenuCatadorRegister } from './../menu-catador-register/menu-catador-register';
import { MenuMaterials } from './../menu-materials/menu-materials';
import { MenuSupport } from './../menu-support/menu-support';
import { ResidueRegister } from './../residue-register/residue-register';
import {ErrorPage} from './../404/ErrorPage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

    menu = MenuPage;
    home = HomePage;
    menuCatadorRegister = MenuCatadorRegister;
    //menuMaterials = MenuMaterials;
    support = MenuSupport;
    newResidue = ResidueRegister;
    searchPage =ErrorPage;
    MaterialSlider = MenuMaterials;
    cadastro = CadastroCatadorWebPage;

  constructor() {

  }

  
}