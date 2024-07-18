import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasUnirParejaPageRoutingModule } from './preguntas-unir-pareja-routing.module';

import { PreguntasUnirParejaPage } from './preguntas-unir-pareja.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PreguntasUnirParejaPageRoutingModule
  ],
  declarations: [PreguntasUnirParejaPage]
})
export class PreguntasUnirParejaPageModule {}
