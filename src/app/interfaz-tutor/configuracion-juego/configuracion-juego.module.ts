import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionJuegoPageRoutingModule } from './configuracion-juego-routing.module';

import { ConfiguracionJuegoPage } from './configuracion-juego.page';
import {CrearJuegoAsociarFrasePageModule} from "../crear-juego-asociar-frase/crear-juego-asociar-frase.module";
import {CrearJuegoUnirParejaPageModule} from "../crear-juego-unir-pareja/crear-juego-unir-pareja.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConfiguracionJuegoPageRoutingModule,
        ReactiveFormsModule,
        CrearJuegoAsociarFrasePageModule,
        CrearJuegoUnirParejaPageModule
    ],
  declarations: [ConfiguracionJuegoPage]
})
export class ConfiguracionJuegoPageModule {}
