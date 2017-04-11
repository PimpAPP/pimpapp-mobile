import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { GoogleMap } from '@ionic-native/google-maps';


@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
    map: GoogleMap;
 
    constructor(public navCtrl: NavController, public platform: Platform) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }
 
    loadMap(){
 
        let location = new GoogleMapsLatLng(-34.9290,138.6010);
 
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
 
    }
}