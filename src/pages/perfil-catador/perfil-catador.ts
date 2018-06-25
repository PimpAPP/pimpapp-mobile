import { ApiProvider } from '../../providers/api-provider';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { MaterialRecover } from './../MaterialRecover';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController, Content } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HostListener } from '@angular/core';
import { UsersAPI } from '../../providers/users-api';

declare var $: any;

@Component({
    selector: 'page-perfil-catador',
    templateUrl: 'perfil-catador.html',
})
export class PerfilCatador {

    @ViewChild(Content) content: Content;
    // catadorID: any = this.navParams.get("catadorID");
    catadorID = 539;
    // catadorID = 5;

    catador: any;
    catadorDiasTrabalhados: any;
    material_list: any[] = [];
    materialRecover: MaterialRecover;
    catadorImg: string;
    minibioMaxSize: Number = 200;
    showCompleteMinibio: boolean = false;
    noImageSrc = 'assets/img/no_image.jpg';
    whatsapp: any;
    public avatar: String = '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public http: UsersAPI, public loading: LoadingController,
        public alertCtrl: AlertController, public callNumber: CallNumber,
        public apiProvider: ApiProvider, public storage: Storage,
        private camera: Camera, public toastCtrl: ToastController,
        public userProvider: UsersAPI) {        
        
        this.materialRecover = new MaterialRecover();
    }

    ngAfterViewInit() {
        if (this.catadorID) {
            this.update();
        }    
    }

    updateData(id) {
        this.catadorID = id;
        this.scrollToTop();
        this.update();
    }

    scrollToTop() {
        this.content.scrollToTop();
        
        setTimeout(function() {
            var div = document.querySelector('#perfil-catador-content > div.scroll-content');
            div.scrollTop = 0;
        });
    }

    update() {
        let url = this.apiProvider.url + "api/catadores/" + this.catadorID + "/";
        //Prepara o loading
        let loader = this.loading.create({
            content: 'Por favor aguarde...',
        });

        loader.present().then(() => {
            this.http.get(url).subscribe(
                data => {
                    this.catadorImg = this.noImageSrc;
                    this.catador = JSON.stringify(data);
                    this.catador = JSON.parse(this.catador);
                    this.showCompleteMinibio = (this.catador.minibio && 
                            this.catador.minibio.length <= this.minibioMaxSize);

                    
                    let photoUrl = this.catador.profile_photo;
                    if (photoUrl) {
                        photoUrl = (photoUrl.startsWith('/')) ? 
                                photoUrl.substr(1, photoUrl.length) : 
                                photoUrl;
                        this.catadorImg = this.apiProvider.url + photoUrl;
                    }

                    if (this.catador.how_many_years_work != null) {
                        let inicio = new Date();
                        inicio.setFullYear(this.catador.how_many_years_work);
                        inicio.setMonth(1);
                        inicio.setHours(1);
                        let fim = new Date();

                        var timeDiff = Math.abs(fim.getTime() - inicio.getTime());
                        this.catadorDiasTrabalhados = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    } else {
                        this.catadorDiasTrabalhados = 0;
                    }
                    this.setMaterialList();

                    var phone = '';
                    
                    if (this.catador.phones && this.catador.phones[0]) {
                        let parts = this.catador.phones[0].phone.split(' ');
                        phone = parts[1].replace('-', '').replace('_', '');
                        if (phone.length == 9) {
                            // Necessário remover o 9 para que o whatsapp
                            // encontre o número
                            phone = phone.substring(1);
                        }
                        phone = parts[0] + phone                            
                    }    
                    
                    this.whatsapp = phone;
                    console.log(this.catador);
                },
                err => { }
            );
            loader.dismiss();
        });
    }

    setMaterialList() {
        let material_id: number;
        this.material_list = [];
        for (let i = 0; i < this.catador.materials_collected.length; i++) {
            material_id = this.catador.materials_collected[i];
            this.material_list.push(
                this.materialRecover.findMaterialId(this.catador.materials_collected[i]));
        }
    }

    launchPhone(number: string) {
        this.callNumber.callNumber(number, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    readMore() {
        this.showCompleteMinibio = !this.showCompleteMinibio;
    }


    photoOnError() {
        this.catadorImg = this.noImageSrc;
    }

    getPhoto(type) {
        if (!this.catador || !this.catador.user) {
            let toast = this.toastCtrl.create({
                message: 'Usuário não encontrado',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        }

        let options: CameraOptions;

        if (type == 'camera') {
            options = {
                quality: 40,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }
        } else {
            options = {
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
            };
        }

        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.avatar = base64Image;
            this.catadorImg = base64Image;            

            this.cadastrarAvatar(this.catador.user);
            let toast = this.toastCtrl.create({
                message: 'Enviando imagem...',
                duration: 5000,
                position: 'bottom'
            });
            toast.present();

        }, (err) => {
            console.log('Error camera: ' + err);
        });

    }
        
    cadastrarAvatar(userId) {        
        if (!this.avatar) return;

        return this.userProvider.addAvatar({ avatar: this.avatar }, userId).subscribe(data => {
            let toast = this.toastCtrl.create({
                message: 'Imagem enviada com sucesso',
                duration: 5000,
                position: 'top'
            });
            toast.present();
        }, err => {
            console.log(err);
            let toast = this.toastCtrl.create({
                message: 'Erro ao enviar imagem. Por favor tente novamente mais tarde.',
                duration: 5000,
                position: 'top'
            });
            toast.present();
        });
    }

    getModifiedDate() {
        var options = {  
            year: "numeric", 
            month: "short",  
            day: "numeric"  
        }; 

        if (this.catador) {
            var date = new Date(this.catador.modified_date);
            return date.toLocaleDateString("pt-br", options);
        } else {
            return '';
        }        
    }

    openUpdatePage() {
        var url = 'http://www.cataki.org/#/cadastro/' + this.catador.id;
        window.open(url, '_system', 'location=yes');
    }
    
    scrollSlideToRight() {
        var slider = document.getElementById("material-slide");
        slider.scrollLeft = slider.scrollLeft + 
                (document.getElementsByClassName('material-slide-item')[0]['offsetWidth'] * 4);
    }

    scrollSlideToLeft() {
        var slider = document.getElementById("material-slide");
        slider.scrollLeft = slider.scrollLeft - 
                (document.getElementsByClassName('material-slide-item')[0]['offsetWidth'] * 4);
    }

    showArrow(side) {
        // setTimeout(() => {
            if (this.material_list.length <= 4) 
            return false;

            var slider = document.getElementById("material-slide");

            if (side == 'left') {
                return slider.scrollLeft != 0;
            } else if (side == 'right') {
                var max = slider.scrollWidth - slider.clientWidth
                return slider.scrollLeft < max;
            }
        // }, 100);
    }

}
