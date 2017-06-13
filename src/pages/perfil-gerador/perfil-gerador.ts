import { ApiProvider } from '../../providers/api-provider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UsersAPI } from '../../providers/users-api';
import { User } from './../User';

@Component({
  selector: 'page-perfil-gerador',
  templateUrl: 'perfil-gerador.html',
})
export class PerfilGerador {

  usuario: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: UsersAPI, public loading: LoadingController, 
    public alertCtrl: AlertController, public apiProvider: ApiProvider) {
      this.usuario = this.http.user;
  }

  ionViewWillEnter() {

    let url = this.apiProvider.url + "api/users/" + this.usuario.id + "/";

    //Prepara o loading
    let loader = this.loading.create({
        content: 'Por favor aguarde...',
    });

    loader.present().then(() => {
      this.http.get(url).subscribe(
        data => {
          this.usuario = data;
          if (this.usuario.photo) {
            this.usuario.photo = this.apiProvider.url + this.usuario.photo.substring(1);
          } 
          console.log(this.usuario);
        },
        err => {              
        }
      );
      loader.dismiss();
    });

  }

    enviarModificacao(tipoMod, mod) {

      console.log("Teste de dados: " + JSON.stringify({ tipoMod: mod }));

      //Prepara o loading
      let loader = this.loading.create({
          content: 'Por favor aguarde...',
      });

        loader.present().then(() => {
            this.http.post({
              tipoMod: mod
            }).subscribe(
              data => {

                JSON.stringify(data);

              },
              err => {
              }
            );
            loader.dismiss();
          });
    }

    mudarNome() {

      let titulo = "Alterar Nome";
      let mensagem = "Digite aqui o seu novo nome";
      let campo = "nome";

      let prompt = this.alertCtrl.create({
        title: titulo,
        message: mensagem,
        inputs: [
          {
            name: campo,
            placeholder: campo
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
             
             let novoNome = data.nome;

             this.http.post({
                "first_name": novoNome
              }).subscribe(
                data => {
                  console.log(JSON.stringify(data));
                },
                err => {
                  console.log("Erro: " + err)
                }
              );
            }
          }
        ]
      });
      prompt.present();

    }

}
