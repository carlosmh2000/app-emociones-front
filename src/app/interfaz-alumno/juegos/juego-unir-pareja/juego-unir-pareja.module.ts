import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoUnirParejaPageRoutingModule } from './juego-unir-pareja-routing.module';

import { JuegoUnirParejaPage } from './juego-unir-pareja.page';
import {HomepagePageModule} from "../../homepage/homepage.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoUnirParejaPageRoutingModule,
    HomepagePageModule
  ],
  declarations: [JuegoUnirParejaPage]
})
export class JuegoUnirParejaPageModule {}
