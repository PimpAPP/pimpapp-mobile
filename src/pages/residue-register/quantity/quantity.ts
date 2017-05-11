import { Residue } from './../../Residue';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MaterialItem } from './../../MaterialItem';
import { Material } from './../../Material';
import { ResumePage } from './../resume/resume';

@Component({
  selector: 'page-quantity',
  templateUrl: 'quantity.html',
})
export class QuantityPage {
  public material: Material;
  public residue: Residue;
  public selectedQuantity: Number = null;
  public bagSelected: boolean = false;
  public canSelected: boolean = false;
  public stackSelected: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController, private camera: Camera) {
        this.material = new Material();
        this.material = navParams.get('material');
        
        this.residue = new Residue();
        this.residue = this.navParams.get('residue');
  }

    openCamera(){
        const options: CameraOptions = {
            quality: 40,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.residue.image = base64Image;
        }, (err) => {
            console.log('Error camera: ' + err);
        });
        
        let materialItem: MaterialItem = new MaterialItem();
        materialItem.material = this.material;
        this.residue.addMaterialItem(materialItem, this.selectedQuantity);
        this.navCtrl.push(ResumePage, { residue: this.residue });
    }

    residueResume(){
        let materialItem: MaterialItem;
        materialItem = this.navParams.get('material');

        this.residue.addMaterialItem(
            materialItem, this.selectedQuantity);

        this.navCtrl.push(ResumePage, 
            { residue: this.residue});
    }
    
    dismiss() {
        if (this.selectedQuantity)
            this.viewCtrl.dismiss(this.selectedQuantity);
        else
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
