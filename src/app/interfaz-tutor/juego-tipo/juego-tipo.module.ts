import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoTipoPageRoutingModule } from './juego-tipo-routing.module';

import { JuegoTipoPage } from './juego-tipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoTipoPageRoutingModule
  ],
  declarations: [JuegoTipoPage]
})
export class JuegoTipoPageModule {}
