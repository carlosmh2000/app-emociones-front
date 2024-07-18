import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasUnirColorPage } from './preguntas-unir-color.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasUnirColorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasUnirColorPageRoutingModule {}
