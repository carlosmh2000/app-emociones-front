import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomepageTutorPageRoutingModule } from './homepage-tutor-routing.module';

import { HomepageTutorPage } from './homepage-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepageTutorPageRoutingModule
  ],
  declarations: [HomepageTutorPage]
})
export class HomepageTutorPageModule {}
