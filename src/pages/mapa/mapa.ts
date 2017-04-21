import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CatadoresPage } from '../catadores/catadores';

declare var google;

/*
  Generated class for the Mapa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit(){

    console.log("Mapa inicializado");

    this.loadMap();
  }

    loadMap() {

      let latLng = new google.maps.LatLng(-34.9290, 138.6010);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }

    goToCatadores() {

      this.navCtrl.push(CatadoresPage);

    }

}
