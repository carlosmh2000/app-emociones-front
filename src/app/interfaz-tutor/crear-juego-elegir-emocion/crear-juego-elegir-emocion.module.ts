import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearJuegoElegirEmocionPageRoutingModule } from './crear-juego-elegir-emocion-routing.module';

import { CrearJuegoElegirEmocionPage } from './crear-juego-elegir-emocion.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrearJuegoElegirEmocionPageRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        CrearJuegoElegirEmocionPage
    ],
    declarations: [CrearJuegoElegirEmocionPage]
})
export class CrearJuegoElegirEmocionPageModule {}
