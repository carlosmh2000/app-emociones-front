import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearJuegoUnirParejaPageRoutingModule } from './crear-juego-unir-pareja-routing.module';

import { CrearJuegoUnirParejaPage } from './crear-juego-unir-pareja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearJuegoUnirParejaPageRoutingModule
  ],
  declarations: [CrearJuegoUnirParejaPage]
})
export class CrearJuegoUnirParejaPageModule {}
