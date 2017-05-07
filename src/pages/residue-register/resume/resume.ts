import { Residue } from './../../Residue';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ListCatadoresNear } from './../list-catadores-near/list-catadores-near';

@Component({
  selector: 'page-resume-residue',
  templateUrl: 'resume.html',
})
export class ResumePage {
  public materials: any[];
  public residue: Residue;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController) {
        this.residue = new Residue();
        this.residue = navParams.get('residue');
  }

  registerResidue(){
    this.navCtrl.push(ListCatadoresNear);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
