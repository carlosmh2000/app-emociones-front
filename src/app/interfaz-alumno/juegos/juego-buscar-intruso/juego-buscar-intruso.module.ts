import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoBuscarIntrusoPageRoutingModule } from './juego-buscar-intruso-routing.module';

import { JuegoBuscarIntrusoPage } from './juego-buscar-intruso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoBuscarIntrusoPageRoutingModule
  ],
  declarations: [JuegoBuscarIntrusoPage]
})
export class JuegoBuscarIntrusoPageModule {}
