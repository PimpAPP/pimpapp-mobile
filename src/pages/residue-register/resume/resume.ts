import { MapUtils } from './../../map-utils';
import { Residue } from './../../Residue';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ListCatadoresNear } from './../list-catadores-near/list-catadores-near';

@Component({
  selector: 'page-resume-residue',
  templateUrl: 'resume.html',
})
export class ResumePage {
  public materials: any[];
  public residue: Residue;
  public location: any;
  public mapUtils: MapUtils;
  public address: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController, public modalCtrl: ModalController) {
        this.mapUtils = new MapUtils();
        this.residue = new Residue();
        this.residue = navParams.get('residue');
        this.mapUtils.getCurrentAddress();
  }

  registerResidue(){
    this.navCtrl.push(ListCatadoresNear);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
