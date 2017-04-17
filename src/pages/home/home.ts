import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { CatadoresProvider } from './../../providers/catadores-provider';
import { CollectsProvider } from './../../providers/collects-provider';
import { ModalController } from 'ionic-angular';
import { NewResidue } from './../new-residue/new-residue';
import { CatadorCollects } from './../catador-collects/catador-collects';


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
    nearest_catadores: any;
    nearest_collects: any;
 
    constructor(public navCtrl: NavController, public platform: Platform,
        private geolocation: Geolocation, public catadoresProvider: CatadoresProvider,
        public collectsProvider: CollectsProvider, public modalCtrl: ModalController) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }

    newResiduePage() {
        console.log('residue');
        let modal = this.modalCtrl.create(NewResidue);
        modal.present();
    }

    catadorCollectPage() {
        console.log('catador');
        let modal = this.modalCtrl.create(CatadorCollects);
        modal.present();
    }

    centerLocation(){
        this.getCurrentLocation().subscribe(location =>{
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

            this.getCurrentLocation().subscribe(location =>{
                this.map.moveCamera(location);
            });
            this.loadCatadores();  
            this.loadCollects();
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
            this.nearest_catadores = data;
            this.plotCatadoresOnMap(this.nearest_catadores, 'Catador');
        });
    }

    loadCollects(){
      this.collectsProvider.getCollectsPositions()
        .subscribe(data => {
            this.nearest_collects = data.results;
            this.plotCollectsOnMap(this.nearest_collects);
        });
    }

    plotCollectsOnMap(points_list){
        let index = 0;

        while (index < points_list.length ){
            let collect = points_list[index];
            
            if (collect.latitude == null || collect.longitude == null){
                index = index + 1
                continue;
            }

            this.createNewPoint(
                collect.latitude, collect.longitude, 'Coleta: ' + collect.id);

            index = index + 1;
        }

    }

    createNewPoint(lat, long, title){
        //Creating the Position
        let position: LatLng = new LatLng(lat, long);

        //Creating the Marker
        let marker: MarkerOptions = {
            position: position,
            title: title
        };

        // Adding the Marker 
        this.map.addMarker(marker)
            .then((marker: Marker) => {
                marker.showInfoWindow();
        });
    }

    plotCatadoresOnMap(points_list, title){
        let index = 0;

        while (index < points_list.length ){
            let catador = points_list[index];
            
            if (catador.geolocation.length == 0){
                index = index + 1
                continue;
            }

            this.createNewPoint(
                catador.geolocation[0].latitude, 
                catador.geolocation[0].longitude, 
                'Catador: ' + catador.id)

           index = index + 1
      }
           
    }
}