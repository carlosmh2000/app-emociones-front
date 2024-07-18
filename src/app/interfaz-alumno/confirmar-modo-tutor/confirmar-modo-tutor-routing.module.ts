import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarModoTutorPage } from './confirmar-modo-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarModoTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarModoTutorPageRoutingModule {}
