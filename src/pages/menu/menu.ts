import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TutorialPage } from './../tutorial/tutorial';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController) {
  }

  openTutorial(){
    this.navCtrl.push(TutorialPage);
  }

}
