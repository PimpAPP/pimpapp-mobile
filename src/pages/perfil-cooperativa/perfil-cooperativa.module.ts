import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PerfilCooperativa } from './perfil-cooperativa';

@NgModule({
  declarations: [
    PerfilCooperativa,
  ],
  exports: [
    PerfilCooperativa
  ]
})
export class PerfilCooperativaModule {}
