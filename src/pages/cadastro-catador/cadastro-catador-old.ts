import { Storage } from '@ionic/storage';
import { LoginPage } from './../login/login';
import { CatadoresProvider } from './../../providers/catadores-provider';
import { Catador } from './../catador';
import { CadastroCatadorPage2 } from './cadastro-catador-page2/cadastro-catador-page2';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cadastro-catador',
  templateUrl: 'cadastro-catador.html',
})
export class CadastroCatador {
  public catador: Catador = new Catador();
  public passwordConfirm: string = '';
  public formValid: boolean = true;
  public avatar:String = '';


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public catadoresProvider: CatadoresProvider, public storage: Storage,) {}

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

    // registerCatador(){
    //     let new_material_list = [];
    //     this.catador.materials_collected.forEach(
    //       item => { new_material_list.push(item.id)});
    //     this.catador.materials_collected = new_material_list;
    //     this.catadoresProvider.registerCatador(this.catador)
    //     .subscribe(data => {
    //         if (this.avatar) {
    //           this.cadastrarAvatar(this.catador.user);
    //         } else {
    //           this.navCtrl.push(LoginPage);
    //         } 
    //         console.log(data);
    //         this.storage.set('catador', data );
    //         this.navCtrl.push(LoginPage);
    //     });
    // }

    // cadastrarAvatar(userId) {
    //   this.userProvider.addAvatar({avatar: this.avatar}, userId).subscribe(data=>{
    //     this.navCtrl.push(LoginPage);
    //   }, err =>{
    //      console.log(err);
    //   });
    //  }

}
