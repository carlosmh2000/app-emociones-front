import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoUnirParejaPageRoutingModule } from './juego-unir-pareja-routing.module';

import { JuegoUnirParejaPage } from './juego-unir-pareja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoUnirParejaPageRoutingModule
  ],
  declarations: [JuegoUnirParejaPage]
})
export class JuegoUnirParejaPageModule {}
