import { LoginPage } from './../../login/login';
import { UsersAPI } from './../../../providers/users-api';
import { CatadoresProvider } from './../../../providers/catadores-provider';
import { Catador } from './../../catador';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cadastro-catador-page5',
  templateUrl: 'cadastro-catador-page5.html',
})
export class CadastroCatadorPage5 {
  public myDate: any;
  public catador: Catador = new Catador();
  public user: any;
  public avatar:String = '';


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public catadoresProvider: CatadoresProvider,
    public userProvider: UsersAPI, private camera: Camera) {
        this.catador = navParams.get('catador');
        console.log(this.catador);
    }

    printItem(){
        console.log(this.catador);
    }

    // Registra UsersAPI
    // Pega token e armazena no banco atual
    // De posse do token cadastra Catador 
        // Precisa ter resolvido a API para pegar automaticamente o user do token

    registerUser(){
        let user = {
            username: this.catador.username, email: this.catador.email,
            first_name: this.catador.name, password: this.catador.password
        };

        console.log(user);
        this.userProvider.post(user).subscribe(data=>{
            console.log(data);
            this.catador.user = data.id;
            this.catador.nickname = this.catador.username;
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
            if (this.avatar) {
              this.cadastrarAvatar(this.catador.user);
            } else {
              this.navCtrl.push(LoginPage);
            } 
            console.log(data);
            this.navCtrl.push(LoginPage);
        });
    }
    
    cadastrarAvatar(userId) {
      this.userProvider.addAvatar({avatar: this.avatar}, userId).subscribe(data=>{
        this.navCtrl.push(LoginPage);
      }, err =>{
         console.log(err);
      });
     }
    
    openCamera(){
        const options: CameraOptions = {
            quality: 40,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            this.avatar = imageData;
        }, (err) => {
            console.log('Error camera: ' + err);
        });
    }


}
