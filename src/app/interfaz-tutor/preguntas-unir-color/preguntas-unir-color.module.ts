import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasUnirColorPageRoutingModule } from './preguntas-unir-color-routing.module';

import { PreguntasUnirColorPage } from './preguntas-unir-color.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PreguntasUnirColorPageRoutingModule
  ],
  declarations: [PreguntasUnirColorPage]
})
export class PreguntasUnirColorPageModule {}
