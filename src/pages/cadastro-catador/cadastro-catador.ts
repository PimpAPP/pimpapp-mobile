import { Http } from '@angular/http';
import { TabsPage } from './../tabs/tabs';
import { MaterialRecover } from './../MaterialRecover';
import { UsersAPI } from './../../providers/users-api';
import { CatadoresProvider } from './../../providers/catadores-provider';
import { Storage } from '@ionic/storage';
import { Catador } from './../catador';
import { CadastroCatadorPage2 } from './cadastro-catador-page2/cadastro-catador-page2';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { 
  GoogleMap, 
  GoogleMaps,
  GoogleMapsEvent, 
  LatLng,
  MarkerOptions,
  Marker,
  CameraPosition
} from '@ionic-native/google-maps';

@Component({
    selector: 'page-cadastro-catador',
    templateUrl: 'cadastro-catador.html',
    providers: [Geolocation]
})
export class CadastroCatador {

    @ViewChild(Slides) slides: Slides;
    public loading: Boolean = false;
    public catador: Catador = new Catador();
    public passwordConfirm: string = '';
    public formValid: boolean = true;
    public requiredFields: any[];
    masks: any;
    number: any;
    numbersOnly: any;
    numbersOnlyy: any;
    public avatar: String = '';
    public materialRecover: MaterialRecover = new MaterialRecover();
    public notValid: boolean = false;
    public errorMessage: any;
    public successMessage: any;
    
    location: LatLng;
    map: GoogleMap;


    constructor(public navCtrl: NavController, public navParams: NavParams,
        public catadoresProvider: CatadoresProvider, public storage: Storage,
        public userProvider: UsersAPI, private camera: Camera,
        public toastCtrl: ToastController, private geolocation: Geolocation,
        private googleMaps: GoogleMaps, public http: Http) {
        this.masks = {
            number: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        };

        this.errorMessage = this.toastCtrl.create({
            message: 'Ocorreu um erro ao cadastrar o catador, por favor tente mais novamente mais tarde.',
            duration: 3000,
            position: 'top'
        });    

        this.successMessage = this.toastCtrl.create({
            message: 'Catador registrado com sucesso!',
            duration: 3000,
            position: 'top'
        });    
    }

    ionViewWillEnter() {
        this.geolocation.getCurrentPosition({timeout: 20000, enableHighAccuracy: false}).then(resp => {
            this.location = new LatLng(resp.coords.latitude, resp.coords.longitude);
            this.updateAddress();
            //this.loadMap();
        }).catch((error) => {
            console.log('Error getting location', error);
        }); 
    }

    loadMap(){
        console.log(this.location);
        
        this.map = new GoogleMap('map2', {
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
            'latLng': this.location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            this.centerLocation();
        });        

    }

    centerLocation(){
        let location: LatLng = new LatLng(this.location.lat, this.location.lng);        
        let position: CameraPosition = {
            target: location,
            zoom: 10,
            tilt: 30
        };
        let markerOptions: MarkerOptions = {
            position: location,
            title: "Você está aqui"
        };

        console.log(markerOptions);
        this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
            //marker.setIcon('www/assets/icon/marker-user.png');
            //marker.setIcon('www/assets/icon/markar-user.png');
            marker.showInfoWindow();
        });
        this.map.refreshLayout();
        this.map.moveCamera(position);
    }

    updateAddress() {
        let url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.location.lat + ',' + this.location.lng;

        this.http.get(url).subscribe(data => {
            var res = JSON.parse(data['_body']);
            var results = res.results;

            for (var x = 0; x < results[0].address_components.length; x++) {
                let item = results[0].address_components[x];

                if (item.types.indexOf('route') >= 0 || item.types.indexOf('street_address') >= 0) {
                    this.catador.address_base = item.long_name;
                    //this.catador.address_base = item.formatted_address;
                } else if (item.types.indexOf('sublocality') >= 0 || 
                        item.types.indexOf('sublocality_level_1') >= 0) {
                    this.catador.address_region = item.long_name;
                } else if (item.types.indexOf('administrative_area_level_2') >= 0) {
                    this.catador.city = item.long_name;
                    //this.catador.city = item.formatted_address;
                } else if (item.types.indexOf('administrative_area_level_1') >= 0) {
                    this.catador.state = item.long_name;
                    //this.catador.state = item.formatted_address;
                } else if (item.types.indexOf('country') >= 0) {
                    this.catador.country = item.long_name;
                }
            }

        }, err => {
            console.log(err);
        });
    }

    openPage2() {
        this.navCtrl.push(CadastroCatadorPage2, { catador: this.catador });
    }

    printItem() {
        console.log(this.catador);
    }

    validPassword() {
        // Password was disabled
        return true;

        // return ((this.catador.password === this.passwordConfirm) && 
        //         (this.catador.password.length > 7));
    }

    save() {
        var valid: any = this.catador.valid();
        if (valid !== true) {
            this.notValid = true;
            let toast = this.toastCtrl.create({
                message: 'Por favor preencha todos os campos obrigatórios.',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        }

        if (!this.validPassword()) {
            return;
        }

        //this.loading = true;
        
        let user = {
            username: this.guid(), 
            email: this.catador.email,
            first_name: this.catador.name, 
            password: 'pimp'
        };

        this.userProvider.post(user).subscribe(data => {
            console.log(data);
            this.storage.set('user', data);
            this.catador.user = data.id;
            this.registerCatador();
        }, err => {
            console.log(err);
            this.errorMessage.present();
        });
    }

    registerCatador() {
        let new_material_list = [];
        this.catador.materials_collected.forEach(
            item => { new_material_list.push(item.id) });
        this.catador.materials_collected = new_material_list;

        this.catadoresProvider.registerCatador(this.catador)
            .subscribe(data => {
                console.log(data);
                this.catador.id = data.id;
                var promises = [];
                this.cadastrarAvatar(this.catador.user);
                this.cadastrarLocation(this.catador.id);
                this.cadastrarPhones(this.catador.phones);

                this.loading = false;
                this.successMessage.present();
                this.navCtrl.push(TabsPage);

                Promise.all(promises).then(function success(res) {
                    //this.storage.set('catador', data);
                    

                }, function error(res) {
                    this.loading = false;
                    console.log(res);
                    this.errorMessage.present();
                })
            }, err => {
                console.log(err);
                this.errorMessage.present();
            });
    }

    cadastrarAvatar(userId) {
        if (!this.avatar) return;

        return this.userProvider.addAvatar({ avatar: this.avatar }, userId).subscribe(data => {
            //this.navCtrl.push(TabsPage);
        }, err => {
            console.log(err);
        });
    }

    cadastrarPhones(phones) {
        return this.catadoresProvider.registerPhones(phones, this.catador.id).subscribe(data => {
            //console.log(data);
            // let toast = this.toastCtrl.create({
            //     message: 'Catador cadastrado com sucesso!',
            //     duration: 3000,
            //     position: 'top'
            // });
            // toast.present();
        }, err => {
            console.log(err);
        });;
    }

    cadastrarLocation(catadorId) {
        let address = '';
        if (this.catador.address_base) 
            address += this.catador.address_base;

        if (this.catador.address_region) 
            address += (address) ? ', ' + this.catador.address_region : this.catador.address_region;

        if (this.catador.city)
            address += (address) ? ', ' + this.catador.city : this.catador.city;

        if (this.catador.state)
            address += (address) ? ', ' + this.catador.state : this.catador.state;

        if (this.catador.country)
            address += (address) ? ', ' + this.catador.country : this.catador.country;
        
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyDS7AxBMmoeRanMxs4-VJJ87I9hMKp-d1E').subscribe(data => {
            var res = JSON.parse(data['_body']);
            var results = res.results;
            if (!results) return;

            var geolocation = results[0]['geometry']['location'];
            var location = {
                latitude: geolocation['lat'],
                longitude: geolocation['lng']
            }

            return this.catadoresProvider.updateLocation(location, catadorId).subscribe(res => {
                console.log(res);
            }, error => {
                console.log(error);
            });
        });
    }

    selectMaterial(material) {
        let materialSelected = this.materialRecover.findMaterial(material);
        this.catador.addMaterialOrRemoveIfAlreadyIncluded(materialSelected);
        console.log(this.catador);
    }

    openCamera() {
        const options: CameraOptions = {
            quality: 40,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.avatar = base64Image;
            let toast = this.toastCtrl.create({
                message: 'Imagem carregada com sucesso!',
                duration: 3000,
                position: 'top'
            });
            toast.present();

        }, (err) => {
            console.log('Error camera: ' + err);
        });

    }

    openGallery() {
        let options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };

        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.avatar = base64Image;
            let toast = this.toastCtrl.create({
                message: 'Imagem carregada com sucesso!',
                duration: 3000,
                position: 'top'
            });
            toast.present();

        }, (err) => {
            console.log('Error camera: ' + err);
        });
    }

    goToSlide(index) {
        switch (index) {
            case "1":
                this.slides.slideTo(0, 5);
                document.getElementById('no1').style.background = "#00b544";//active
                document.getElementById('no2').style.background = "#7bd9a2";
                document.getElementById('no3').style.background = "#7bd9a2";
                document.getElementById('no4').style.background = "#7bd9a2";
                document.getElementById('no5').style.background = "#7bd9a2";
                break;

            case "2":
                this.slides.slideTo(1, 5);
                document.getElementById('no1').style.background = "#7bd9a2";
                document.getElementById('no2').style.background = "#00b544";
                document.getElementById('no3').style.background = "#7bd9a2";
                document.getElementById('no4').style.background = "#7bd9a2";
                document.getElementById('no5').style.background = "#7bd9a2";
                break;

            case "3":
                this.slides.slideTo(2, 5);
                document.getElementById('no1').style.background = "#7bd9a2";
                document.getElementById('no2').style.background = "#7bd9a2";
                document.getElementById('no3').style.background = "#00b544";
                document.getElementById('no4').style.background = "#7bd9a2";
                document.getElementById('no5').style.background = "#7bd9a2";
                break;

            case "4":
                this.slides.slideTo(3, 5);
                document.getElementById('no1').style.background = "#7bd9a2";
                document.getElementById('no2').style.background = "#7bd9a2";
                document.getElementById('no3').style.background = "#7bd9a2";
                document.getElementById('no4').style.background = "#00b544";
                document.getElementById('no5').style.background = "#7bd9a2";
                break;

            case "5":
                this.slides.slideTo(4, 5);
                document.getElementById('no1').style.background = "#7bd9a2";
                document.getElementById('no2').style.background = "#7bd9a2";
                document.getElementById('no3').style.background = "#7bd9a2";
                document.getElementById('no4').style.background = "#7bd9a2";
                document.getElementById('no5').style.background = "#00b544";
                break;

            default:
                break;
        }


    }

    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        //alert("Current index is"+currentIndex);

        switch (currentIndex) {
            case 0:
                document.getElementById('no1').style.background = "#00b544";//active
                document.getElementById('no2').style.background = "#7bd9a2";
                document.getElementById('no3').style.background = "#7bd9a2";
                document.getElementById('no4').style.background = "#7bd9a2";
                document.getElementById('no5').style.background = "#7bd9a2";
                break;

            case 1:
                document.getElementById('no2').style.background = "#00b544";//active
                document.getElementById('no1').style.background = "#7bd9a2";
                document.getElementById('no3').style.background = "#7bd9a2";
                document.getElementById('no4').style.background = "#7bd9a2";
                document.getElementById('no5').style.background = "#7bd9a2";
                break;

            case 2:
                document.getElementById('no1').style.background = "#7bd9a2";
                document.getElementById('no3').style.background = "#00b544";
                document.getElementById('no2').style.background = "#7bd9a2";
                document.getElementById('no4').style.background = "#7bd9a2";
                document.getElementById('no5').style.background = "#7bd9a2";
                break;

            case 3:
                document.getElementById('no1').style.background = "#7bd9a2";
                document.getElementById('no2').style.background = "#7bd9a2";
                document.getElementById('no4').style.background = "#00b544";
                document.getElementById('no3').style.background = "#7bd9a2";
                document.getElementById('no5').style.background = "#7bd9a2";
                break;

            case 4:
                document.getElementById('no1').style.background = "#7bd9a2";
                document.getElementById('no2').style.background = "#7bd9a2";
                document.getElementById('no3').style.background = "#7bd9a2";
                document.getElementById('no5').style.background = "#00b544";
                document.getElementById('no4').style.background = "#7bd9a2";
                break;

            default:
                break;
        }

    }

    guid() {
        const s4=()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
    }

}
