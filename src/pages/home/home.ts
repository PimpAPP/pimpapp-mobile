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
import { TranslateService } from '@ngx-translate/core';
import { TutorialPage } from '../tutorial/tutorial';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';


import {
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    MarkerOptions,
    Marker,
    CameraPosition,
    AnimateCameraOptions
} from '@ionic-native/google-maps';
import { SearchFilter } from '../search-filter';
import { MapFilter } from '../map-filter/map-filter';
import { IntroSlidePage } from '../intro-slide/intro-slide';

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

    searchFilter = new SearchFilter();
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
        private translate: TranslateService, public storage: Storage, 
        public http: Http) {

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

            this.openIntroSlide();
            
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

    openIntroSlide() {
        // this.navCtrl.push(TutorialPage);
        const modal = this.modalCtrl.create(IntroSlidePage);
        modal.present();
    }

    search() {
        this.loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });

        this.loading.present();

        if (this.map) // To work in browser
            this.map.clear();
        
        this.catadoresProvider.search(this.searchFilter).subscribe(data => {
            this.nearest_catadores = data;
            this.plotCatadoresOnMap(this.nearest_catadores, 'Catador');
            this.loadCooperatives();

            if (this.searchFilter.state || this.searchFilter.city) {
                // Set zoom on state/city
                this.setZoomOnSearchAddress(this.searchFilter);
            } else {
                // Set zoom on nearest Catador
                this.setCurrentPosition();
                var target = this.NearestCity(this.openLatitude, this.openLongitude);
                this.setZoomOnNearestCatador(target);
            }

            this.loading.dismiss();
        });
    }

    setZoomOnSearchAddress(searchFilter) {
        let address = '';

        if (searchFilter.city)
            address += (address) ? ', ' + searchFilter.city : searchFilter.city;

        if (searchFilter.state)
            address += (address) ? ', ' + searchFilter.state : searchFilter.state;        
        
        if (searchFilter.street)
            address += (address) ? ', ' + searchFilter.street : searchFilter.street;   

        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + 
                address + '&key=AIzaSyDS7AxBMmoeRanMxs4-VJJ87I9hMKp-d1E';

        return this.http.get(url).subscribe(data => {
            var res = JSON.parse(data['_body']);
            var results = res.results;
            if (!results) return;

            var geolocation = results[0]['geometry']['location'];
            var latlng = new LatLng(
                geolocation['lat'],
                geolocation['lng']
            );

            this.setSearchPosition(latlng);

            let position: AnimateCameraOptions = {
                target: latlng,
                tilt: 0,
                duration: 1000
            };
        
            if (this.map) {
                this.map.animateCamera(position).then(() => {
                    // Deveria ser possível pegar o zoom atual e redefini-lo com um 
                    // menor valor. Mas ao fazer isso com o getCameraPosition() o
                    // o zoom não é aplicado.
                    this.map.getCameraPosition().then((position) => {
                        position.zoom = position.zoom - 0.5;
                        console.log(position.zoom);
                        this.map.moveCamera(position);
                    }); 
                });
            }
        });
    }

    callbackFilter = (_params) => {
        return new Promise((resolve, reject) => {
            this.searchFilter = this.searchFilter;
            this.search();
            resolve();
        });
   }

    openFilter() {
        this.navCtrl.push(
            MapFilter, 
            { 
                searchFilter: this.searchFilter ,
                callback: this.callbackFilter
            },
            { animate: true })
    }

    openTutorial() {
        this.storage.ready().then(() => {
            this.storage.get('firstAccess').then((val) => {
                if (val == null || val == 1) {
                    // this.navCtrl.push(TutorialPage);
                    const modal = this.modalCtrl.create(TutorialPage);
                    modal.present();
                }
            });
        });
    }

    loadCatadores() {
        this.catadoresProvider.getCatadoresPositions()
            .subscribe(data => {
                this.nearest_catadores = data; 
                var target = this.NearestCity(this.openLatitude, this.openLongitude);
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

        if (this.map) {
            this.map.addMarker(markerOptions).then((marker: Marker) => {
                marker.showInfoWindow();
            });
        }
    }

    setSearchPosition(latLng) {
        let markerOptions: MarkerOptions;
        let iconURL: string = 'assets/icon/marker-user.png';

        if (this.platform.is('ios')) {
            markerOptions = {
                position: latLng,
                title: "Você pesquisou aqui",
                icon: { url: iconURL },
            };
        } else {
            markerOptions = {
                position: latLng,
                title: "Você pesquisou aqui",
                icon: { url: "file:///android_asset/www/" + iconURL },
            };
        }

        if (this.map) {
            this.map.addMarker(markerOptions).then((marker: Marker) => {
                marker.showInfoWindow();
            });
        }
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
            this.setCurrentPosition();
            this.plotCatadoresOnMap(this.nearest_catadores, 'Catador');
            this.loadCooperatives();
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
    
        if (this.map) {
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
        this.cooperativesProvider.search(this.searchFilter).subscribe(data => {
            let index = 0;
            this.nearest_cooperativas = data;

            // console.log('Total de cooperativas: ' + this.nearest_cooperativas.length);
            while (index < this.nearest_cooperativas.length ){
                let cooperative = this.nearest_cooperativas[index];

                if (!cooperative.hasOwnProperty('latitude') ||
                    !cooperative.hasOwnProperty('longitude')) {
                    index = index + 1
                    continue;
                }

                let iconType: string = 'assets/icon/marker_cooperativa-2.png';
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
        if (this.map) {
            this.map.addMarker(marker)
                .then((marker: Marker) => {
                    //marker.setIcon('www/' + iconURL);
                    //marker.showInfoWindow();
                });
        }
    }

    iconClicked(id, type) {
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

        var profileDiv = document.getElementById('profileDiv');
        var mapDiv = document.getElementById('map');

        mapDiv.style.transition = 'height 1s';
        mapDiv.style.webkitTransition = 'height 1s';

        profileDiv.style.transition = 'height 1s';
        profileDiv.style.webkitTransition = 'height 1s';
        profileDiv.style.position = 'absolute';
        profileDiv.style.bottom = '-20px';
        profileDiv.style.zIndex = '2222';
        profileDiv.style.padding = '6px 12px';
        profileDiv.style.width = '100%';
        profileDiv.style.background = '#fff';
        profileDiv.style.color = '#fff';
        profileDiv.style.height = '75%';

        mapDiv.style.height = '30%';
        
        document.getElementById('closeDiv').style.display = 'block';

        var topPos = profileDiv.offsetTop;
        profileDiv.scrollTop = topPos;

        this.map.setClickable(false);
        var pos = this.map.getCameraPosition()['target'];
        console.log(pos);
        // this.map.setCenter
    }

    closeProfile() {
        if (this.map)
            this.map.setClickable(true);

        var profileDiv = document.getElementById('profileDiv');
        var mapDiv = document.getElementById('map');
        profileDiv.style.height = '0%';
        profileDiv.style.bottom = '-20px';
        profileDiv.style.transition = 'height 1s';
        profileDiv.style.webkitTransition = 'height 1s';

        mapDiv.style.transition = 'height 1s';
        mapDiv.style.webkitTransition = 'height 1s';
        mapDiv.style.height = '100%';

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

            let iconType: string = 'assets/icon/marker-catador-2.png';

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

        if (this.nearest_catadores.length > 0) {
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

        } else {
            var latlngCatador = new LatLng(
                this.openLatitude,
                this.openLongitude
            );
        }

        var latlng = new LatLng(
            this.openLatitude,
            this.openLongitude
        );

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
