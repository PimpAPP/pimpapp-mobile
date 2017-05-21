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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

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

      // Remove
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

}
