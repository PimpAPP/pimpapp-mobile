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
import { ResidueRegister } from './../residue-register/residue-register';
import { NgZone } from '@angular/core';


import { 
  GoogleMap, 
  GoogleMapsEvent, 
  LatLng,
  MarkerOptions,
  Marker,
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
    showProfile: boolean;
 
    constructor(public navCtrl: NavController, public platform: Platform,
        private geolocation: Geolocation, public catadoresProvider: CatadoresProvider,
        public collectsProvider: CollectsProvider, public modalCtrl: ModalController, public zone:NgZone) {

        this.showProfile = false;
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
             let markerOptions: MarkerOptions = {
                position: location,
                title: "It's you"
            };

            this.map.addMarker(markerOptions)
            .then((marker: Marker) => {
              //  marker.setIcon('www/assets/icon/marker-catador.png');
                marker.showInfoWindow();
            });
            this.map.moveCamera(position);
        });
    }

    loadMap(){
        let location: LatLng = new LatLng(43.0741904,-89.3809802);
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            // 'myLocationButton': true,
            'indoorPicker': true//,
           // 'zoom': true
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
            this.getCurrentLocation().subscribe(location =>{
            // Change this as per Logic - Sudipta 
            let iconType:string = 'assets/icon/pin-gerador.png';

            this.createNewPoint(
                location.latitude, 
                location.longitude, 
                'Sua posição',iconType);
                this.map.moveCamera(location);
            });
            this.loadCatadores();  
            // this.loadCollects();
            this.centerLocation();
        });        
    }

    getCurrentLocation(){
        return Observable.create(observable =>{
            let options = {timeout: 1000, enableHightAccuracy: true};

        this.geolocation.getCurrentPosition().then(resp => {
            console.log('getCurrentPosition found' );
            let lat = resp.coords.latitude;
            let lng = resp.coords.longitude;
            let location: LatLng = new LatLng(lat, lng);
            this.reverseGeoCode(lat, lng);
            observable.next(location);
        },(error) => {
            console.log('Error on getting current location: ' + error);
        });
        /*   this.geolocation.getCurrentPosition(options)
            .then(
                resp => {
                    let lat = resp.coords.latitude;
                    let lng = resp.coords.longitude;
                    let location: LatLng = new LatLng(lat, lng);
                    this.reverseGeoCode(lat, lng);
                    observable.next(location);
                },
                (error) => {
                    console.log('Error on getting current location: ' + error);
                });*/
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
               // title: title,
                icon: { url : iconURL },
                //markerClick:this.iconClicked
                 markerClick:(()=>{this.iconClicked(title)})
            };
        }else{
            marker = {
                position: position,
               // title: title,
                icon: { url : "file:///android_asset/www/" + iconURL },
               // markerClick:this.iconClicked
              markerClick:(()=>{this.iconClicked(title)})
            };            
        }


        // Adding the Marker 
        this.map.addMarker(marker)
            .then((marker: Marker) => {
                marker.setIcon('www/' + iconURL);
                //marker.showInfoWindow();
        });
    }
profileTitle:any;
   iconClicked(title){
       console.log("parameter: " + title);
       this.profileTitle = title;
        console.log("Add");        
        document.getElementById('ngifDiv').style.transition='height 1s';
        document.getElementById('ngifDiv').style.webkitTransition='height 1s';
        document.getElementById('ngifDiv').style.position='absolute';
        document.getElementById('ngifDiv').style.bottom='-20px';
        document.getElementById('ngifDiv').style.zIndex='2222';
        document.getElementById('ngifDiv').style.padding='6px 12px';
        document.getElementById('ngifDiv').style.width='100%';
        document.getElementById('ngifDiv').style.background='#fff';
        document.getElementById('ngifDiv').style.color='#fff';
        document.getElementById('ngifDiv').style.height='45%';
        this.map.setClickable(false);    
    }

    closeSlide(){
        this.map.setClickable(true);
        console.log('remove');
        document.getElementById('ngifDiv').style.height='0%';
        document.getElementById('ngifDiv').style.bottom='-20px';
        document.getElementById('ngifDiv').style.transition='height 1s';
        document.getElementById('ngifDiv').style.webkitTransition='height 1s';

    }

    goRegisterMate() {
        this.navCtrl.push(ResidueRegister);
    }

    plotCatadoresOnMap(points_list, title){
        let index = 0;

        while (index < points_list.length ){
            let catador = points_list[index];
            
            if (catador.geolocation.length == 0){
                index = index + 1
                continue;
            }

           // let iconType:string = 'assets/icon/pin-catador-rs.png';
            let iconType:string = 'assets/icon/marker-catador.png';

            this.createNewPoint(
                catador.geolocation[0].latitude, 
                catador.geolocation[0].longitude, 
                'Catador: ' + catador.geolocation[0].reverse_geocoding,iconType);

           index = index + 1
      }
           
    }




reverseGeoCode(lat,lng){
      let geocoder = new google.maps.Geocoder();
      let request = {
          latLng: new LatLng(lat,lng)
      };

      geocoder.geocode(request,(data, status)=>{
            if (status == google.maps.GeocoderStatus.OK) {  
                this.selectedAddress.lat = lat;
                this.selectedAddress.lng =lng;
                this.selectedAddress.add =  data[0].formatted_address;
            }         
      }); 
  }
    
}