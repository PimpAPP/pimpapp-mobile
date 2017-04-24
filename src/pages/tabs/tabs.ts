import { Component } from '@angular/core';
import { HomePage } from './../home/home';
import { MenuPage } from './../menu/menu';
import { MenuCatadorRegister } from './../menu-catador-register/menu-catador-register';
import { MenuMaterials } from './../menu-materials/menu-materials';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

    menu = MenuPage;
    home = HomePage;
    menuCatadorRegister = MenuCatadorRegister;
    menuMaterials = MenuMaterials;

  constructor() {

  }
}