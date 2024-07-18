import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearJuegoAsociarImagenPageRoutingModule } from './crear-juego-asociar-imagen-routing.module';

import { CrearJuegoAsociarImagenPage } from './crear-juego-asociar-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearJuegoAsociarImagenPageRoutingModule
  ],
  declarations: [CrearJuegoAsociarImagenPage]
})
export class CrearJuegoAsociarImagenPageModule {}
