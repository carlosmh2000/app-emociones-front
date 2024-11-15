import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionJuegoPageRoutingModule } from './configuracion-juego-routing.module';

import { ConfiguracionJuegoPage } from './configuracion-juego.page';
import {CrearJuegoAsociarFrasePageModule} from "../crear-juego-asociar-frase/crear-juego-asociar-frase.module";
import {CrearJuegoUnirParejaPageModule} from "../crear-juego-unir-pareja/crear-juego-unir-pareja.module";
import {CrearJuegoPageModule} from "../crear-juego/crear-juego.module";
import {CrearJuegoBuscarIntrusoPageModule} from "../crear-juego-buscar-intruso/crear-juego-buscar-intruso.module";
import {CrearJuegoAsociarImagenPageModule} from "../crear-juego-asociar-imagen/crear-juego-asociar-imagen.module";
import {CrearJuegoElegirEmocionPageModule} from "../crear-juego-elegir-emocion/crear-juego-elegir-emocion.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionJuegoPageRoutingModule,
    ReactiveFormsModule,
    CrearJuegoAsociarFrasePageModule,
    CrearJuegoUnirParejaPageModule,
    CrearJuegoPageModule,
    CrearJuegoBuscarIntrusoPageModule,
    CrearJuegoAsociarImagenPageModule,
    CrearJuegoElegirEmocionPageModule
  ],
  declarations: [ConfiguracionJuegoPage]
})
export class ConfiguracionJuegoPageModule {}
