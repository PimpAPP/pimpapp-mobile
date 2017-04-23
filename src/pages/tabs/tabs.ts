import { Component } from '@angular/core';
import { NewResidue } from './../new-residue/new-residue';
import { HomePage } from './../home/home';
import { MenuPage } from './../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

    menu = MenuPage;
    home = HomePage;
    newResidue = NewResidue;

  constructor() {

  }
}