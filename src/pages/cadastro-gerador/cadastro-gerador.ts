import { TabsPage } from './../tabs/tabs';
import { UsersAPI } from './../../providers/users-api';
import { Gerador } from './../Gerador';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-cadastro-gerador',
  templateUrl: 'cadastro-gerador.html',
})
export class CadastroGerador {
  public error: string = '';
  public gerador: Gerador;
  public avatar: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userProvider: UsersAPI, private camera: Camera, 
    public toastCtrl: ToastController) {
      this.gerador = new Gerador();
  }

  cadastrarGerador(){
    this.userProvider.post({
            username: this.gerador.username, email: this.gerador.email,
            first_name: this.gerador.name, password: this.gerador.password
        }).subscribe(data=>{
            if (this.avatar) {
              this.cadastrarAvatar(data.id);
            } else {
              this.navCtrl.push(TabsPage);
            } 
      }, err =>{
         console.log(err);
         this.error = err._body;
      });
  }

  cadastrarAvatar(userId) {
      this.userProvider.addAvatar({avatar: this.avatar}, userId).subscribe(data=>{
        this.navCtrl.push(TabsPage);
      }, err =>{
         console.log(err);
         this.error = err._body;
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





}
