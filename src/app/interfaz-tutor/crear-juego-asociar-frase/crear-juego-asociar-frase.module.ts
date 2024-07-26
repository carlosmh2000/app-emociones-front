import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearJuegoAsociarFrasePageRoutingModule } from './crear-juego-asociar-frase-routing.module';

import { CrearJuegoAsociarFrasePage } from './crear-juego-asociar-frase.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrearJuegoAsociarFrasePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [CrearJuegoAsociarFrasePage]
})
export class CrearJuegoAsociarFrasePageModule {}
