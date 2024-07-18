import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAlumnoPageRoutingModule } from './crear-alumno-routing.module';

import { CrearAlumnoPage } from './crear-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrearAlumnoPageRoutingModule
  ],
  declarations: [CrearAlumnoPage]
})
export class CrearAlumnoPageModule {}
