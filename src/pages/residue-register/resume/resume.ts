import { ResiduesProvider } from './../../../providers/residues-providers';
import { MapUtils } from './../../map-utils';
import { Residue } from './../../Residue';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ListCatadoresNear } from './../list-catadores-near/list-catadores-near';
import { Geocoder, LatLng } from '@ionic-native/google-maps';


@Component({
  selector: 'page-resume-residue',
  templateUrl: 'resume.html',
  providers: [ Geocoder ],
})
export class ResumePage {
  public materials: any[];
  public residue: Residue;
  public location: LatLng;
  public locationDetermined: boolean;
  public mapUtils: MapUtils;
  public address: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public viewCtrl: ViewController, public residuesProvider: ResiduesProvider,
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
        this.residue.reverse_geocoding = this.address;
        
        let new_material_list = [];
        this.residue.materials.forEach(
          item => { new_material_list.push(item.material.id)});
        this.residue.materials = new_material_list;

        this.residuesProvider.registerResidue(this.residue)
            .subscribe(data => {
                console.log(data);
                this.residuesProvider.registerResidueLocation(
                    data.id, {latitude: this.location.lat, longitude: this.location.lng})
                        .subscribe(data => {
                            console.log('location: ');
                            console.log(data);
                        });
            });
        this.navCtrl.push(ListCatadoresNear);
    }

    dismiss(){
      this.viewCtrl.dismiss();
    }

}
