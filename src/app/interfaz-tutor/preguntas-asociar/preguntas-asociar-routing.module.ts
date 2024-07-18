import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasAsociarPage } from './preguntas-asociar.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasAsociarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasAsociarPageRoutingModule {}
