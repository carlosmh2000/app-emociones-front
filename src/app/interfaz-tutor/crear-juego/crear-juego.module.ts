import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearJuegoPageRoutingModule } from './crear-juego-routing.module';

import { CrearJuegoPage } from './crear-juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrearJuegoPageRoutingModule
  ],
  declarations: [CrearJuegoPage]
})
export class CrearJuegoPageModule {}
