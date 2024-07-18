import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionAlumnoPageRoutingModule } from './configuracion-alumno-routing.module';

import { ConfiguracionAlumnoPage } from './configuracion-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ConfiguracionAlumnoPageRoutingModule
  ],
  declarations: [ConfiguracionAlumnoPage]
})
export class ConfiguracionAlumnoPageModule {}
