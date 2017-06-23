import { TabsPage } from './../tabs/tabs';
import { MaterialRecover } from './../MaterialRecover';
import { UsersAPI } from './../../providers/users-api';
import { CatadoresProvider } from './../../providers/catadores-provider';
import { Storage } from '@ionic/storage';
import { Catador } from './../catador';
import { CadastroCatadorPage2 } from './cadastro-catador-page2/cadastro-catador-page2';
import { Component , ViewChild} from '@angular/core';
import { NavController, NavParams, Slides, ToastController } from 'ionic-angular';
// import * as $ from 'jquery';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-cadastro-catador',
  templateUrl: 'cadastro-catador.html',
})
export class CadastroCatador {
 @ViewChild(Slides) slides: Slides; 
  public catador: Catador = new Catador();
  public passwordConfirm: string = '';
  public formValid: boolean = true;
  masks:any;
  number:any;
  numbersOnly:any;
  numbersOnlyy:any;
  public avatar:String = '';
  public materialRecover: MaterialRecover = new MaterialRecover();

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public catadoresProvider: CatadoresProvider, public storage: Storage, 
  public userProvider: UsersAPI, private camera: Camera, 
  public toastCtrl: ToastController) {

      this.masks = {
			number: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/]
		};
  }
 
  openPage2(){
      if (this.validForm())
        this.navCtrl.push(CadastroCatadorPage2, { catador: this.catador });
  }

  
  validForm(){
      this.formValid = (
          (this.catador.name.length > 0) &&
          (this.catador.email.length > 0) &&
          (this.catador.password.length > 0)
      )
      this.formValid = true;
      return this.formValid;
  }

  printItem(){
      console.log(this.catador);
  }

  validPassword(){
      return ((this.catador.password === this.passwordConfirm) && 
              (this.catador.password.length > 7));
  }

    registerUserNew(){
        console.log('register user');
        let user = {
            username: this.catador.nickname, email: this.catador.email,
            first_name: this.catador.name, password: this.catador.password
        };

        console.log(user);
        this.userProvider.post(user).subscribe(data=>{
            console.log(data);
            this.storage.set('user', data );
            this.catador.user = data.id;
            this.registerCatador();
        });
    }

   registerCatador(){
        let new_material_list = [];
        this.catador.materials_collected.forEach(
          item => { new_material_list.push(item.id)});
        this.catador.materials_collected = new_material_list;

        this.catadoresProvider.registerCatador(this.catador)
        .subscribe(data => {
            console.log(data);
            this.catador.id = data.id;
            this.cadastrarAvatar(this.catador.user);
            this.cadastrarPhones(this.catador.phones);
            this.storage.set('catador', data );
            this.navCtrl.push(TabsPage);
        });
    }

    cadastrarAvatar(userId) {
        if (!this.avatar) return;

        return this.userProvider.addAvatar({avatar: this.avatar}, userId).subscribe(data=>{
            this.navCtrl.push(TabsPage);
        }, err =>{
            console.log(err);
        });
    }

    cadastrarPhones(phones) {
        return this.catadoresProvider.registerPhones(phones, this.catador.id);
    }

    selectMaterial(material){
      let materialSelected = this.materialRecover.findMaterial(material);
      this.catador.addMaterialOrRemoveIfAlreadyIncluded(materialSelected);
      console.log(this.catador);
    }

    openCamera(){
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

   goToSlide(index) {
        if(index=="1"){
        this.slides.slideTo(0, 5);
        document.getElementById('no1').style.background="#00b544";//active
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";     
    }
    
    if(index=="2"){
        if(this.validForm()){
        this.slides.slideTo(1, 5);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#00b544";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
    }
    else{
        this.slides.slideTo(0, 5);
    }
    }

    if(index=="3"){
        this.slides.slideTo(2, 5);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#00b544";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
    }
    if(index=="4"){
        this.slides.slideTo(3, 5);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#00b544";
        document.getElementById('no5').style.background="#7bd9a2";
    }
    if(index=="5"){
        this.slides.slideTo(4, 5);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#00b544";
    }

}

slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    //alert("Current index is"+currentIndex);
     if(currentIndex == 0){
        document.getElementById('no1').style.background="#00b544";//active
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
        
    }
    if(currentIndex == 1){
        document.getElementById('no2').style.background="#00b544";//active
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
        
    }
    
    if(currentIndex == 2){
     document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#00b544";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
        
    }

    if(currentIndex == 3){
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#00b544";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
        
    }
    if(currentIndex == 4){
        
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#00b544";
        document.getElementById('no4').style.background="#7bd9a2";
        
    }
   
}



}
