import { Component } from '@angular/core';
import { NavController, Platform , LoadingController, Navbar } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from './../../providers/api-provider';
import { CatadoresProvider } from './../../providers/catadores-provider';
import { CollectsProvider } from './../../providers/collects-provider';
import { PerfilCatador } from './../perfil-catador/perfil-catador';
import { ModalController } from 'ionic-angular';
import { NewResidue } from './../new-residue/new-residue';
import { CollectsOpen } from './../collects-open/catador-collects';
import { AutocompletePage } from './../autocomplete/autocomplete';
import { ResidueRegister } from './../residue-register/residue-register';
import { NgZone, ViewChild } from '@angular/core';


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
 
    @ViewChild(PerfilCatador) perfilCatadorChild;
    @ViewChild(Navbar) navBar: Navbar;

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
    catadorId: any;
    showCatadorProfile: boolean = false;
    profileTitle:any;
    clickMarkerData:any;
    markerCatador_type:any;
    markerAddress:any;
    markerName:any;
    markerPhone:any;
    markerPhoto:any;   

 
    constructor(public navCtrl: NavController, public platform: Platform,
        private geolocation: Geolocation, public catadoresProvider: CatadoresProvider,
        public collectsProvider: CollectsProvider, public modalCtrl: ModalController, public zone:NgZone,
        public loadingCtrl : LoadingController,  public apiProvider: ApiProvider) {
        
        this.loading = this.loadingCtrl.create({
             content: 'Please wait...'
        });
        // this.loading.present();
        this.showProfile = false; 

        this.platform.ready().then(() => {
            this.geolocation.getCurrentPosition({timeout: 40000, enableHighAccuracy: true}).then(resp => {
                this.openLatitude = resp.coords.latitude;
                this.openLongitude = resp.coords.longitude;
                this.loadMap(15);
            }).catch((error) => {
                console.log('Error getting location - Focando no Brasil', error);
                this.openLatitude = -13.702797;
                this.openLongitude = -69.686511;
                this.loadMap(3);
            });     

        },(error) => {
            console.log('Error ' + error);
        });
    }

    /**
     * Action called by the back button.
     */
    backButtonAction() {
        if (this.showCatadorProfile) {
            console.log("Não fecha");
            this.closeProfile();
        } else {
            console.log("Fecha");
            this.platform.exitApp();
            // this.navCtrl.setRoot(AnotherPage);  <-- if you wanted to go to another page
        }
    }

    newResiduePage() {
        let modal = this.modalCtrl.create(NewResidue);
        modal.present();
    }

    collectsOpenPage() {
        this.navCtrl.push(CollectsOpen);
    }

    centerLocation(){
        var location = new LatLng(this.openLatitude, this.openLongitude);

        let position: CameraPosition = {
            target: location,
            zoom: 15,
            tilt: 30
        };

        let markerOptions: MarkerOptions;
        let iconURL:string = 'assets/icon/marker-user.png';

        if (this.platform.is('ios')) {
            markerOptions = {
                position: location,
                title: "ó você aqui",
                icon: { url : iconURL },
            };
        }else{
            markerOptions = {
                position: location,
                title: "ó você aqui",
                icon: { url : "file:///android_asset/www/" + iconURL },
            };            
        }

        this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
            marker.showInfoWindow();
        });
       
        this.map.moveCamera(position);
    }

    loadMap(zoom){
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
            'tilt': 0,
            'zoom': zoom,
            'bearing': 0
          }
        });
        this.loadCatadores();  

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            // this.getCurrentLocation().subscribe(location =>{
            // });
            // this.loadCollects();
            this.centerLocation();
            this.loading.dismiss();
        });        
    }

    getCurrentLocation(){
        return Observable.create(observable =>{

        this.geolocation.getCurrentPosition().then(resp => {
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
                //marker.setIcon('www/' + iconURL);
                //marker.showInfoWindow();
        });
    }

    iconClicked(id) {
        // let id = 0;
        // for (var x=0; x<this.nearest_catadores.length; x++) {
        //     if (this.nearest_catadores[x].name == title) {
        //         id = this.nearest_catadores[x].id;
        //         break;
        //     }
        // }
       
        this.catadorId = id;
        this.showCatadorProfile = true;
        this.perfilCatadorChild.updateData(id);

        var div = document.getElementById('ngifDiv');

        div.style.transition='height 1s';
        div.style.webkitTransition='height 1s';
        // div.style.position='relative';
        div.style.position='absolute';
        div.style.bottom='-20px';
        div.style.zIndex='2222';
        div.style.padding='6px 12px';
        div.style.width='100%';
        div.style.background='#fff';
        div.style.color='#fff';
        div.style.height='75%';
        document.getElementById('closeDiv').style.display='block';

        var topPos = div.offsetTop;
        div.scrollTop = topPos;
        
        this.map.setClickable(false);
    }

     closeProfile(){
         this.map.setClickable(true);
        var div = document.getElementById('ngifDiv');
         div.style.height='0%';
         div.style.bottom='-20px';
        div.style.transition='height 1s';
        div.style.webkitTransition='height 1s';
        document.getElementById('closeDiv').style.display='none';

        // setTimeout(function() {
            this.showCatadorProfile = false;
        // }, 300);
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
                // catador.name,iconType);
                catador.id,iconType);

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
