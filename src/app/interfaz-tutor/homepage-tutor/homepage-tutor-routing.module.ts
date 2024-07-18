import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageTutorPage } from './homepage-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: HomepageTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageTutorPageRoutingModule {}
