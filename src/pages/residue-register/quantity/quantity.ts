import { ResumePage } from './../resume/resume';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-quantity',
  templateUrl: 'quantity.html',
})
export class QuantityPage {
  public material: any;
  public materialImageList = { misturado: 'Icones_materiais-misturado.png'}
  public materialImage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController) {
        this.material = 'Misturado';
        this.materialImage = 'Icones_materiais-misturado.png';
  }

  takePictures(){

  }

  residueResume(){
    this.navCtrl.push(ResumePage)
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
