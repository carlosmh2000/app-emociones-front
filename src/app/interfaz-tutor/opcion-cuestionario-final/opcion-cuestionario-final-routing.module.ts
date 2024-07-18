import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionCuestionarioFinalPage } from './opcion-cuestionario-final.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionCuestionarioFinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionCuestionarioFinalPageRoutingModule {}
