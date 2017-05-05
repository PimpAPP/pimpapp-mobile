import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ListCatadoresNear } from './../list-catadores-near/list-catadores-near';

@Component({
  selector: 'page-resume-residue',
  templateUrl: 'resume.html',
})
export class ResumePage {
  public materials = [
    {id: 1, description:'Papel', color: '#ccc', quantity: 0}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController) {

        console.log(navParams.get('residue'));
  }

  registerResidue(){
    this.navCtrl.push(ListCatadoresNear);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
