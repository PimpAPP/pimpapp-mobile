import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { CatadoresProvider } from './../../providers/catadores-provider';
import { CollectsProvider } from './../../providers/collects-provider';
import { ModalController } from 'ionic-angular';
import { NewResidue } from './../new-residue/new-residue';
import { CollectsOpen } from './../collects-open/catador-collects';
import { AutocompletePage } from './../autocomplete/autocomplete';

import { 
  GoogleMap, 
  GoogleMapsEvent, 
  LatLng,
  MarkerOptions,
  Marker,
  MarkerIcon,
  GoogleMapsAnimation,
  CameraPosition
} from '@ionic-native/google-maps';

declare var google:any;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [Geolocation]
})
export class HomePage {
 
    map: GoogleMap;
    nearest_catadores: any;
    nearest_collects: any;
    selectedAddress={
        add:"",
        lat:0,
        lng:0
    };
 
    constructor(public navCtrl: NavController, public platform: Platform,
        private geolocation: Geolocation, public catadoresProvider: CatadoresProvider,
        public collectsProvider: CollectsProvider, public modalCtrl: ModalController) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }

    newResiduePage() {
        let modal = this.modalCtrl.create(NewResidue);
        modal.present();
    }

    collectsOpenPage() {
        this.navCtrl.push(CollectsOpen);
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

         /* let icon: MarkerIcon = {
              url: 'img/car-icon.png',
          }*/

          let markerColeta: MarkerOptions = {
            position: coleta,
            title: 'Coleta',
           // icon: icon,
            animation: GoogleMapsAnimation.BOUNCE
          };

          let markerCatador: MarkerOptions = {
            position: catador,
            title: 'Catador',
            //icon: icon,
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

    showAddressModal(){

        const modal = this.modalCtrl.create(AutocompletePage);

        this.map.setClickable(false);

        modal.onDidDismiss(data => {
            this.map.setClickable(true);
            if(data!=null){
                    this.selectedAddress.add = data.add;
                    this.selectedAddress.lat = data.lat;
                    this.selectedAddress.lng = data.lng;
                    let loc = new LatLng(data.lat,data.lng);
                    let position: CameraPosition = {
                        target: loc,
                        zoom: 15,
                        tilt: 30
                    };
                    this.map.moveCamera(position);
            }    
        });

        modal.present();

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

            // Change this as per Logic - Sudipta 

            let iconType:string = 'assets/icon/pin-catador-rs.png';


            this.createNewPoint(
                collect.latitude, collect.longitude, 'Coleta: ' + collect.id,iconType);

            index = index + 1;
        }

    }

    createNewPoint(lat, long, title, iconURL){
        //Creating the Position
        let position: LatLng = new LatLng(lat, long);

        //Creating the Dynamic Marker

        let marker: MarkerOptions;

        if (this.platform.is('ios')) {
            marker = {
                position: position,
                title: title,
                icon: { url : iconURL }
            };
        }else{
            marker = {
                position: position,
                title: title,
                icon: { url : "file:///android_asset/www/" + iconURL }
            };            
        }


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

            // Change this as per Logic - Sudipta 
            let iconType:string = 'assets/icon/pin-catador-rs.png';

            this.createNewPoint(
                catador.geolocation[0].latitude, 
                catador.geolocation[0].longitude, 
                'Catador: ' + catador.geolocation[0].reverse_geocoding,iconType);

           index = index + 1
      }
           
    }
}