import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoAsociarEmocionPageRoutingModule } from './juego-asociar-emocion-routing.module';

import { JuegoAsociarEmocionPage } from './juego-asociar-emocion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoAsociarEmocionPageRoutingModule
  ],
  declarations: [JuegoAsociarEmocionPage]
})
export class JuegoAsociarEmocionPageModule {}
