import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { CatadoresProvider } from './../../providers/catadores-provider';

import { 
  GoogleMap, 
  GoogleMapsEvent, 
  LatLng,
  MarkerOptions,
  Marker,
  MarkerIcon,
  Geocoder,
  GoogleMapsAnimation,
  CameraPosition
} from '@ionic-native/google-maps';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [Geolocation]
})
export class HomePage {
 
    map: GoogleMap;
    geocode : Geocoder;
    neares_catadores: any[];
 
    constructor(public navCtrl: NavController, public platform: Platform,
        private geolocation: Geolocation, public catadoresProvider: CatadoresProvider) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }

    ngOnInit(){
        this.getCurrentLocation().subscribe(location =>{
            this.map.moveCamera(location);
        });
        this.loadCatadores();        
    }

    centerLocation(){
        console.log('centering');
        this.getCurrentLocation().subscribe(location =>{
            console.log('Location: ' + location);
            let position: CameraPosition = {
                target: location,
                zoom: 10,
                tilt: 30
            };
            this.map.moveCamera(position);
        });
    }

    loadMap(){
 
        let location = new LatLng(-23.616786, -46.669331);
 
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            // 'myLocationButton': true,
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
          let catador: LatLng = new LatLng(-23.616786, -46.669331);
          let coleta: LatLng = new LatLng(-23.618742, -46.667335);

          let icon: MarkerIcon = {
              url: 'img/car-icon.png',
          }

          let markerColeta: MarkerOptions = {
            position: coleta,
            title: 'Coleta',
            icon: icon,
            animation: GoogleMapsAnimation.BOUNCE
          };

          let markerCatador: MarkerOptions = {
            position: catador,
            title: 'Catador',
            icon: icon,
            animation: GoogleMapsAnimation.BOUNCE
          };

          this.map.addMarker(markerCatador)
            .then((marker: Marker) => {
                marker.showInfoWindow();
            });

            this.map.addMarker(markerColeta)
            .then((marker: Marker) => {
                marker.showInfoWindow();
            });

        });
    }

    getCurrentLocation(){
        return Observable.create(observable =>{
            let options = {timeout: 1000, enableHightAccuracy: true};

            this.geolocation.getCurrentPosition(options)
                .then(
                    resp => {
                        let lat = resp.coords.latitude;
                        let lng = resp.coords.longitude;
                        let location: LatLng = new LatLng(lat, lng);
                        observable.next(location);
                    },
                    (error) => {
                        console.log('Error on getting current location: ' + error);
                    });
        });
    }

    loadCatadores(){
      this.catadoresProvider.getCatadoresPositions()
        .subscribe(data => {
            this.neares_catadores = data;
            console.log(this.neares_catadores);
        });
    }

}