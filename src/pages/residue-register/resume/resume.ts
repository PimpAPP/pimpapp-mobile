import { MapUtils } from './../../map-utils';
import { Residue } from './../../Residue';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ListCatadoresNear } from './../list-catadores-near/list-catadores-near';
import { Geocoder } from '@ionic-native/google-maps';


@Component({
  selector: 'page-resume-residue',
  templateUrl: 'resume.html',
  providers: [ Geocoder ],
})
export class ResumePage {
  public materials: any[];
  public residue: Residue;
  public location: Location;
  public locationDetermined: boolean;
  public mapUtils: MapUtils;
  public address: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController, public modalCtrl: ModalController,
      public geocoder: Geocoder) {
        this.mapUtils = new MapUtils();
        
        this.residue = new Residue();
        this.residue = navParams.get('residue');
  }

    ionViewCanEnter(){
        this.mapUtils.getCurrentLocation().subscribe(location =>{
            this.location = location;
            console.log(this.location);
            this.geocoder.geocode(location).then((res) => {
                this.address = res;
                console.log(res);
                this.locationDetermined = this.address.length > 0 ? true : false;
            }).catch((err) => {
                console.log('Falha ao traduzir localização: ' + err);
                this.locationDetermined = false;
            });
        });
  }

  registerResidue(){
    this.residue.address = this.address;
    this.residue.location = this.location;
    this.navCtrl.push(ListCatadoresNear);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
