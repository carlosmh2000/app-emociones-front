import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionCuestionarioFinalPageRoutingModule } from './opcion-cuestionario-final-routing.module';

import { OpcionCuestionarioFinalPage } from './opcion-cuestionario-final.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OpcionCuestionarioFinalPageRoutingModule
  ],
  declarations: [OpcionCuestionarioFinalPage]
})
export class OpcionCuestionarioFinalPageModule {}
