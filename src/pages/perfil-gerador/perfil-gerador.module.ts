import { NgModule } from '@angular/core';
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
