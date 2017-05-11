import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PerfilGerador } from './perfil-gerador';

@NgModule({
  declarations: [
    PerfilGerador,
  ],
  exports: [
    PerfilGerador
  ]
})
export class PerfilGeradorModule {}
