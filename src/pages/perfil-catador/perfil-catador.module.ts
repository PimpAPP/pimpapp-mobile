import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PerfilCatador } from './perfil-catador';

@NgModule({
  declarations: [
    PerfilCatador,
  ],
  exports: [
    PerfilCatador
  ]
})
export class PerfilCatadorModule {}
