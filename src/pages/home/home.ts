import { ApiProvider } from './../../providers/api-provider';
import { Component } from '@angular/core';
import { NavController, Platform , LoadingController} from 'ionic-angular';
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
    openLatitude:any;
    openLongitude:any;
    loading:any;
    Platform: Platform;
 
    constructor(public navCtrl: NavController, public platform: Platform,
        private geolocation: Geolocation, public catadoresProvider: CatadoresProvider,
        public collectsProvider: CollectsProvider, public modalCtrl: ModalController, public zone:NgZone,
        public loadingCtrl : LoadingController,  public apiProvider: ApiProvider) {
        console.log('Construct ');
        
        this.loading = this.loadingCtrl.create({
             content: 'Please wait...'
        });
        // this.loading.present();
        this.showProfile = false; 

        this.platform.ready().then(() => {
            console.log('Ready: ');
            this.geolocation.getCurrentPosition({timeout: 20000, enableHighAccuracy: false}).then(resp => {
                console.log('getCurrentPosition: ');
                console.log(resp);

                    this.openLatitude = resp.coords.latitude;
                    this.openLongitude = resp.coords.longitude;
                    this.loadMap();
            
            }).catch((error) => {
                console.log('Error getting location', error);
            });     
        },(error) => {
            console.log('Error ' + error);
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
                title: "ó você aqui"
            };

            this.map.addMarker(markerOptions)
            .then((marker: Marker) => {
                //marker.setIcon('www/assets/icon/marker-user.png');
                marker.setIcon('www/assets/icon/markar-user.png');
                marker.showInfoWindow();
            });
            this.map.moveCamera(position);
        });
    }

    loadMap(){
        console.log('loadMap');
        let location: LatLng = new LatLng(this.openLatitude,this.openLongitude);
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
        this.loadCatadores();  

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            this.getCurrentLocation().subscribe(location =>{
            });
            // this.loadCollects();
            this.centerLocation();
            this.loading.dismiss();
        });        
    }

    getCurrentLocation(){
        return Observable.create(observable =>{

        this.geolocation.getCurrentPosition().then(resp => {
            console.log('getCurrentPosition found : ' + resp.coords.latitude + ' , ' +  resp.coords.longitude);
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
            console.log(this.nearest_catadores);
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
            console.log("index is: "+ index);
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
    clickMarkerData:any;
    markerCatador_type:any;
    markerAddress:any;
    markerName:any;
    markerPhone:any;
    markerPhoto:any;

    iconClicked(title) {
        let id = 0;
        for (var x=0; x<this.nearest_catadores.length; x++) {
            if (this.nearest_catadores[x].name == title) {
                id = this.nearest_catadores[x].id;
                break;
            }
        }
       
        // this.profileTitle = title;

        this.catadoresProvider.getDataUsingID(id).subscribe(data => {
            this.clickMarkerData = data;
            if(this.clickMarkerData.catador_type){ this.markerCatador_type = this.clickMarkerData.catador_type; console.log(this.markerCatador_type); }
            if(this.clickMarkerData.address_base){ this.markerAddress = this.clickMarkerData.address_base; console.log(this.markerAddress); }
            if(this.clickMarkerData.name){ this.markerName = this.clickMarkerData.name; console.log(this.markerName);}
            if(this.clickMarkerData.phones){ this.markerPhone = this.clickMarkerData.phones[0].phone; console.log(this.markerPhone);}
            if(this.clickMarkerData.profile_photo){ this.markerPhoto = this.clickMarkerData.profile_photo;console.log(this.markerPhoto);
            }else{ this.markerPhoto = 'assets/img/no_image.jpg'; }

            console.log(this.clickMarkerData.email);
            console.log("individual marker data is: ");
            console.log(this.clickMarkerData);
           // loading.dismiss();
        });

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
        document.getElementById('closeDiv').style.display='block';
        
        this.map.setClickable(false);    
    }

     closeSlide(){
        this.map.setClickable(true);
        console.log('remove');
        document.getElementById('ngifDiv').style.height='0%';
        document.getElementById('ngifDiv').style.bottom='-20px';
        document.getElementById('ngifDiv').style.transition='height 1s';
        document.getElementById('ngifDiv').style.webkitTransition='height 1s';
        document.getElementById('closeDiv').style.display='none';
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

            let iconType:string = 'assets/icon/marker-catador.png';

            this.createNewPoint(
                catador.geolocation[0].latitude, 
                catador.geolocation[0].longitude, 
                catador.name,iconType);

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