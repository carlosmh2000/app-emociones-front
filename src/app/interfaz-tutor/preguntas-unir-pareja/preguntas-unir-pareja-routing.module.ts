import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasUnirParejaPage } from './preguntas-unir-pareja.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasUnirParejaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasUnirParejaPageRoutingModule {}
