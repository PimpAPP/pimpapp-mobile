import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, Navbar } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from './../../providers/api-provider';
import { CatadoresProvider } from './../../providers/catadores-provider';
import { CooperativesProvider } from './../../providers/cooperatives-provider';
import { CollectsProvider } from './../../providers/collects-provider';
import { PerfilCatador } from './../perfil-catador/perfil-catador';
import { PerfilCooperativa } from './../perfil-cooperativa/perfil-cooperativa';
import { ModalController } from 'ionic-angular';
import { NewResidue } from './../new-residue/new-residue';
import { CollectsOpen } from './../collects-open/catador-collects';
import { AutocompletePage } from './../autocomplete/autocomplete';
import { ResidueRegister } from './../residue-register/residue-register';
import { NgZone, ViewChild } from '@angular/core';
import { DatabaseProvider } from './../../providers/database/database-provider';
import { LangProvider } from './../../providers/lang/lang-provider';
import { LangPage } from './../lang-page/lang-page';
import { TranslateService } from '@ngx-translate/core';


import {
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    MarkerOptions,
    Marker,
    CameraPosition,
    AnimateCameraOptions
} from '@ionic-native/google-maps';

declare var google: any;

@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
    providers: [Geolocation]
})
export class HomePage {

    @ViewChild(PerfilCatador) perfilCatadorChild;
    @ViewChild(PerfilCooperativa) perfilCooperativaChild;
    @ViewChild(Navbar) navBar: Navbar;

    map: GoogleMap;
    nearest_catadores: any;
    nearest_collects: any;
    nearest_cooperativas: any;
    selectedAddress = {
        add: "",
        lat: 0,
        lng: 0
    };
    openLatitude: any;
    openLongitude: any;
    loading: any;
    Platform: Platform;
    profileTitle: any;
    clickMarkerData: any;
    markerCatador_type: any;
    markerAddress: any;
    markerName: any;
    markerPhone: any;
    markerPhoto: any;
    mapZoom = 3;

    showProfile: boolean = false;
    showCatadorProfile: boolean = false;
    showCooperativaProfile: boolean = false;

    constructor(public navCtrl: NavController, public platform: Platform,
        private geolocation: Geolocation, public catadoresProvider: CatadoresProvider,
        public collectsProvider: CollectsProvider, public modalCtrl: ModalController, 
        public zone:NgZone, public loadingCtrl : LoadingController,  
        public apiProvider: ApiProvider, public cooperativesProvider: CooperativesProvider,
        private dbProvider: DatabaseProvider, private langProvider: LangProvider,
        private translate: TranslateService) {
        
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        // this.loading.present();
        this.showProfile = false;

        this.translate.setDefaultLang('pt_BR');

        this.platform.ready().then(() => {
            //Criando o banco de dados
            // this.dbProvider.createDatabase().then(() => {                
            //     this.langProvider.get(1).then(lang => {
            //         if (lang) {
            //             this.translate.use(lang.value);
            //         } else {
            //             this.navCtrl.push(LangPage);
            //         }
            //     }, error => {
            //         console.log(error);
            //     });
 
            // }).catch((error) => {
            //     console.log('error');
            // });

            // Buscando posição atual
            this.geolocation.getCurrentPosition({timeout: 40000, enableHighAccuracy: true}).then(resp => {
                this.openLatitude = resp.coords.latitude;
                this.openLongitude = resp.coords.longitude;
                this.mapZoom = 15;
                this.loadCatadores();
                // this.loadMap(15);
            }).catch((error) => {
                console.log('Error getting location - Focando no Brasil', error);
                this.openLatitude = -13.702797;
                this.openLongitude = -69.686511;
                this.mapZoom = 3;
                this.loadCatadores();
                // this.loadMap(3);
            });

        }, (error) => {
            console.log('Error ' + error);
        });
    }

    loadCatadores() {
        this.catadoresProvider.getCatadoresPositions()
            .subscribe(data => {
                this.nearest_catadores = data;
                var target = this.NearestCity(this.openLatitude, this.openLongitude);
                // Chamar as cooperativas só após carregar os catadores.
                // this.loadCooperatives();
                this.loadMap(this.mapZoom, target);
            });
    }

    newResiduePage() {
        let modal = this.modalCtrl.create(NewResidue);
        modal.present();
    }

    collectsOpenPage() {
        this.navCtrl.push(CollectsOpen);
    }

    setCurrentPosition() {
        var location = new LatLng(this.openLatitude, this.openLongitude);
        let markerOptions: MarkerOptions;
        let iconURL: string = 'assets/icon/marker-user.png';

        if (this.platform.is('ios')) {
            markerOptions = {
                position: location,
                title: "ó você aqui",
                icon: { url: iconURL },
            };
        } else {
            markerOptions = {
                position: location,
                title: "ó você aqui",
                icon: { url: "file:///android_asset/www/" + iconURL },
            };
        }

        this.map.addMarker(markerOptions)
            .then((marker: Marker) => {
                marker.showInfoWindow();
            });
    }

    loadMap(zoom, target?) {
        let location: LatLng = new LatLng(this.openLatitude, this.openLongitude);
        this.map = new GoogleMap('map', {
            'backgroundColor': 'white',
            'controls': {
                'compass': true,
                // 'myLocationButton': true,
                'indoorPicker': true,//,
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
                'tilt': 0,
                'zoom': zoom,
                'bearing': 0,
                // 'target': target
            }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            // this.centerLocation();
            // this.loadCatadores();
            this.setCurrentPosition();
            this.plotCatadoresOnMap(this.nearest_catadores, 'Catador');
            // this.setZoomOnNearestCatador(target);
        });
    }

// Testando push 

    setZoomOnNearestCatador(target) {
        let position: AnimateCameraOptions = {
            target: target,
            tilt: 0,
            duration: 1000
        };
    
        this.map.animateCamera(position).then(() => {
            // Deveria ser possível pegar o zoom atual e redefini-lo com um 
            // menor valor. Mas ao fazer isso com o getCameraPosition() o
            // o zoom não é aplicado.
            this.map.getCameraPosition().then((position) => {
                position.zoom = position.zoom - 0.5;
                this.map.moveCamera(position);
            }); 
        });
    }

    getCurrentLocation() {
        return Observable.create(observable => {

            this.geolocation.getCurrentPosition().then(resp => {
                let lat = resp.coords.latitude;
                let lng = resp.coords.longitude;
                let location: LatLng = new LatLng(lat, lng);
                this.reverseGeoCode(lat, lng);
                observable.next(location);
            }, (error) => {
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

    showAddressModal() {
        const modal = this.modalCtrl.create(AutocompletePage);

        this.map.setClickable(false);

        modal.onDidDismiss(data => {
            this.map.setClickable(true);
            if (data != null) {
                this.selectedAddress.add = data.add;
                this.selectedAddress.lat = data.lat;
                this.selectedAddress.lng = data.lng;
                let loc = new LatLng(data.lat, data.lng);
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

    loadCooperatives() {
        this.cooperativesProvider.getCooperatives().subscribe(data => {
            let index = 0;
            // console.log(data);
            this.nearest_cooperativas = JSON.parse(data['_body']);

            // console.log('Total de cooperativas: ' + this.nearest_cooperativas.length);
            while (index < this.nearest_cooperativas.length ){
                let cooperative = this.nearest_cooperativas[index];

                if (!cooperative.hasOwnProperty('latitude') ||
                    !cooperative.hasOwnProperty('longitude')) {
                    index = index + 1
                    continue;
                }

                let iconType: string = 'assets/icon/cooperative-small2.png';
                // let iconType:string = 'assets/icon/marker-user.png';

                this.createNewPoint(
                    cooperative.latitude,
                    cooperative.longitude,
                    cooperative.id,
                    iconType,
                    'cooperativa');

                index = index + 1
            }
        });
    }

    loadCollects() {
        this.collectsProvider.getCollectsPositions()
            .subscribe(data => {
                this.nearest_collects = data.results;
                this.plotCollectsOnMap(this.nearest_collects);
            });
    }

    plotCollectsOnMap(points_list) {
        let index = 0;

        while (index < points_list.length) {
            let collect = points_list[index];

            if (collect.latitude == null || collect.longitude == null) {
                index = index + 1
                continue;
            }

            // Change this as per Logic - Sudipta 

            let iconType: string = 'assets/icon/pin-catador-rs.png';


            this.createNewPoint(
                collect.latitude,
                collect.longitude,
                'Coleta: ' + collect.id,
                iconType,
                'coleta');

            index = index + 1;
        }

    }

    createNewPoint(lat, long, title, iconURL, type) {
        //Creating the Position
        let position: LatLng = new LatLng(lat, long);

        //Creating the Dynamic Marker

        let marker: MarkerOptions;

        if (this.platform.is('ios')) {
            marker = {
                position: position,
                // title: title,
                icon: { url: iconURL },
                //markerClick:this.iconClicked
                markerClick: (() => { this.iconClicked(title, type) })
            };
        } else {
            marker = {
                position: position,
                // title: title,
                icon: { url: "file:///android_asset/www/" + iconURL },
                // markerClick:this.iconClicked
                markerClick: (() => { this.iconClicked(title, type) })
            };
        }


        // Adding the Marker 
        this.map.addMarker(marker)
            .then((marker: Marker) => {
                //marker.setIcon('www/' + iconURL);
                //marker.showInfoWindow();
            });
    }

    iconClicked(id, type) {
        // let id = 0;
        // for (var x=0; x<this.nearest_catadores.length; x++) {
        //     if (this.nearest_catadores[x].name == title) {
        //         id = this.nearest_catadores[x].id;
        //         break;
        //     }
        // }

        this.showProfile = true;

        switch (type) {
            case 'catador':
                this.showCooperativaProfile = false;
                this.showCatadorProfile = true;
                this.perfilCatadorChild.updateData(id);
                break;

            case 'cooperativa':
                this.showCatadorProfile = false;
                this.showCooperativaProfile = true;
                this.perfilCooperativaChild.updateData(id);
                break;

            default:
                break;
        }

        var div = document.getElementById('ngifDiv');

        div.style.transition = 'height 1s';
        div.style.webkitTransition = 'height 1s';
        // div.style.position='relative';
        div.style.position = 'absolute';
        div.style.bottom = '-20px';
        div.style.zIndex = '2222';
        div.style.padding = '6px 12px';
        div.style.width = '100%';
        div.style.background = '#fff';
        div.style.color = '#fff';
        div.style.height = '75%';
        document.getElementById('closeDiv').style.display = 'block';

        var topPos = div.offsetTop;
        div.scrollTop = topPos;

        this.map.setClickable(false);
    }

    closeProfile() {
        this.map.setClickable(true);
        var div = document.getElementById('ngifDiv');
        div.style.height = '0%';
                div.style.bottom = '-20px';
        div.style.transition = 'height 1s';
        div.style.webkitTransition = 'height 1s';
        document.getElementById('closeDiv').style.display = 'none';

        // setTimeout(function() {
        this.showProfile = false;
        this.showCatadorProfile = false;
        this.showCooperativaProfile = false;
        // }, 300);
    }

    goRegisterMate() {
        this.navCtrl.push(ResidueRegister);
    }

    plotCatadoresOnMap(points_list, title) {
        let index = 0;

        while (index < points_list.length) {
            let catador = points_list[index];

            if (catador.geolocation.length == 0) {
                index = index + 1
                continue;
            }

            let iconType: string = 'assets/icon/marker-catador.png';

            this.createNewPoint(
                catador.geolocation[0].latitude,
                catador.geolocation[0].longitude,
                catador.id,
                iconType,
                'catador');

            index = index + 1
        }

    }

    reverseGeoCode(lat, lng) {
        let geocoder = new google.maps.Geocoder();
        let request = {
            latLng: new LatLng(lat, lng)
        };
        geocoder.geocode(request, (data, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                this.selectedAddress.lat = lat;
                this.selectedAddress.lng = lng;
                this.selectedAddress.add = data[0].formatted_address;
            }
        });
    }

    // Convert Degress to Radians
    Deg2Rad(deg) {
        return deg * Math.PI / 180;
    }

    PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
        lat1 = this.Deg2Rad(lat1);
        lat2 = this.Deg2Rad(lat2);
        lon1 = this.Deg2Rad(lon1);
        lon2 = this.Deg2Rad(lon2);
        var R = 6371; // km
        var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        var y = (lat2 - lat1);
        var d = Math.sqrt(x * x + y * y) * R;
        return d;
    }

    NearestCity(latitude, longitude) {
        var mindif = 99999;
        var closest;

        for (var index = 0; index < this.nearest_catadores.length; ++index) {
            try {
                var catadorLatitude = this.nearest_catadores[index].geolocation[0].latitude;
                var catadorLongitude = this.nearest_catadores[index].geolocation[0].longitude;

                var dif = this.PythagorasEquirectangular(latitude, longitude, catadorLatitude, catadorLongitude);
                if (dif < mindif) {
                    closest = index;
                    mindif = dif;
                }
            } catch (error) {
                // do nothing
            }    
        }
        var latlngCatador = new LatLng(
            this.nearest_catadores[closest].geolocation[0].latitude, 
            this.nearest_catadores[closest].geolocation[0].longitude
        );
        var latlng = new LatLng(
            this.openLatitude,
            this.openLongitude
        );

        console.log(this.openLatitude);
        console.log([latlng, latlngCatador]);
        return [latlng, latlngCatador];
    }


    /**
     * Action called by the back button.
     */
    backButtonAction() {
        if (this.showProfile) {
            console.log("Não fecha");
            this.closeProfile();
        } else {
            console.log("Fecha");
            this.platform.exitApp();
            // this.navCtrl.setRoot(AnotherPage);  <-- if you wanted to go to another page
        }
    }

}
