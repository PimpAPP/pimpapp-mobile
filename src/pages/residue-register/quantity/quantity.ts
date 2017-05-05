import { MaterialItem } from './../../MaterialItem';
import { ResumePage } from './../resume/resume';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-quantity',
  templateUrl: 'quantity.html',
})
export class QuantityPage {
  public material: any;
  public selectedQuantity: Number = null;
  public bagSelected: boolean = false;
  public canSelected: boolean = false;
  public stackSelected: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController) {
        this.material = navParams.get('material');
  }

    takePictures(){

    }

    residueResume(){
        let materialItem: MaterialItem;
        let residue = this.navParams.get('residue');
        materialItem = this.navParams.get('material');

        materialItem.quantity = this.selectedQuantity;

        residue.materialList.push(materialItem);

        this.navCtrl.push(ResumePage, 
            { residue: residue});
    }
    
    dismiss() {
        this.viewCtrl.dismiss(this.selectedQuantity);
    }

    selectQuantity(option){
        switch (option){
        case 'bag':
            this.bagSelected = true;
            this.canSelected = false;
            this.stackSelected = false;
            this.selectedQuantity = 1;
        break;
        case 'can':
            this.canSelected = true;
            this.bagSelected = false;
            this.stackSelected = false;
            this.selectedQuantity = 2;
        break;
        case 'stack':
            this.canSelected = false;
            this.bagSelected = false;
            this.stackSelected = true;
            this.selectedQuantity = 3;
        break;
        }
    }

}
