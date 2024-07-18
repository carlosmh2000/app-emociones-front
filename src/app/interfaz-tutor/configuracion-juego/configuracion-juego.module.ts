import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionJuegoPageRoutingModule } from './configuracion-juego-routing.module';

import { ConfiguracionJuegoPage } from './configuracion-juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionJuegoPageRoutingModule
  ],
  declarations: [ConfiguracionJuegoPage]
})
export class ConfiguracionJuegoPageModule {}
