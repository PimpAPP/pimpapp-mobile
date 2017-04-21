import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { UsersAPI } from '../../providers/users-api';
import { CameraProvider } from '../../providers/camera-provider';
import { MapaPage } from '../mapa/mapa';

/*
  Generated class for the Cadastro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  styleUrls: [
    'shared/css/webflow.css',
    'shared/css/normalize.css',
    'shared/css/reco-f55819.webflow.css'
  ]
})
export class CadastroPage {

  userNome : any;
  userEmail : any;
  userSenha : any;
  userConfirmaSenha : any;
  resposta : any[];

  constructor(public nav: NavController, public navParams: NavParams, public http: UsersAPI, public camera: CameraProvider, public loading: LoadingController, public alertCtrl: AlertController) {
    this.http;
    this.nav =nav;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

    tirarFoto() {

      this.camera.takePicture();

    }

    tratarDados(dados) {

      return JSON.parse(JSON.stringify(dados));

    }

    validarCampos() {

      if(this.userNome == null || this.userEmail == null || this.userSenha == null || this.userConfirmaSenha == null) {

        this.mostrarAlerta("Erro!", "Por favor preencha todos os campos para continuar.");

        return false;

      } else if(this.userSenha != this.userConfirmaSenha) {

        this.mostrarAlerta("Erro!", "As senhas precisam ser idênticas.");

        return false;

      } else {

        return true;

      }

    }

    mostrarAlerta(titulo, mensagem) {

      let alert = this.alertCtrl.create({
        title: titulo,
        subTitle: mensagem,
        buttons: ['OK']
      });
      alert.present();

    }

    cadastrar() {

      if(this.validarCampos() == true) {

        let url = "http://179.188.38.243/api/users/";
        let fields = {
          username : this.userEmail,
          email : this.userEmail,
          first_name : this.userNome
        };

        //Prepara o loading
        let loader = this.loading.create({
          content: 'Por favor aguarde...',
        });
        
        loader.present().then(() => {
          this.http.post(url, fields).subscribe(
            data => {

              this.resposta = data;

              this.nav.push(MapaPage);

            },
            err => {

              let erro = this.tratarDados(err);
              let erro_texto = JSON.parse(erro._body);

              if(erro_texto.username !== undefined) {

                this.mostrarAlerta("Erro!", erro_texto.username);

              } else if(erro_texto.email !== undefined) {

                this.mostrarAlerta("Erro!", erro_texto.email);

              }
              
            }
          );
          loader.dismiss();
        });

      }

    }

}
