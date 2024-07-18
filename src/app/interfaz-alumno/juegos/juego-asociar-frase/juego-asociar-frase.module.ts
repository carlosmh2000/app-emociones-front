import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoAsociarFrasePageRoutingModule } from './juego-asociar-frase-routing.module';

import { JuegoAsociarFrasePage } from './juego-asociar-frase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoAsociarFrasePageRoutingModule
  ],
  declarations: [JuegoAsociarFrasePage]
})
export class JuegoAsociarFrasePageModule {}
