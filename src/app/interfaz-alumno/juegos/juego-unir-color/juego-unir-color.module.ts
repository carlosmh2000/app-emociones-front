import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoUnirColorPageRoutingModule } from './juego-unir-color-routing.module';

import { JuegoUnirColorPage } from './juego-unir-color.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoUnirColorPageRoutingModule
  ],
  declarations: [JuegoUnirColorPage]
})
export class JuegoUnirColorPageModule {}
