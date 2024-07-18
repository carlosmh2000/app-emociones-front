import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasAsociarPageRoutingModule } from './preguntas-asociar-routing.module';

import { PreguntasAsociarPage } from './preguntas-asociar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PreguntasAsociarPageRoutingModule
  ],
  declarations: [PreguntasAsociarPage]
})
export class PreguntasAsociarPageModule {}
