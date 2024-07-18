import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarModoTutorPageRoutingModule } from './confirmar-modo-tutor-routing.module';

import { ConfirmarModoTutorPage } from './confirmar-modo-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarModoTutorPageRoutingModule
  ],
  declarations: [ConfirmarModoTutorPage]
})
export class ConfirmarModoTutorPageModule {}
