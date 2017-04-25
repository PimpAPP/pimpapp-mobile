import { NgModule } from '@angular/core';
import { ResidueRegister } from './residue-register';

@NgModule({
  declarations: [
    ResidueRegister,
  ],
  imports: [
    // IonicModule.forChild(ResidueRegister),
  ],
  exports: [
    ResidueRegister
  ]
})
export class ResidueRegisterModule {}
