import { IonicModule, IonicApp } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ResidueRegister } from './residue-register';
import { QuantityPage } from './quantity/quantity';

@NgModule({
  declarations: [
    ResidueRegister,
    QuantityPage
  ],
  imports: [
    IonicModule.forRoot(ResidueRegister),
  ],
  bootstrap: [IonicApp],
  exports: [
    ResidueRegister
  ],
  entryComponents: [
    QuantityPage,
  ]
})
export class ResidueRegisterModule {}
