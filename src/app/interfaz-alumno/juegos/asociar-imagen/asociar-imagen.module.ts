import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsociarImagenPageRoutingModule } from './asociar-imagen-routing.module';

import { AsociarImagenPage } from './asociar-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsociarImagenPageRoutingModule
  ],
  declarations: [AsociarImagenPage]
})
export class AsociarImagenPageModule {}
