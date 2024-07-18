import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoUnirParejaPage } from './juego-unir-pareja.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoUnirParejaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoUnirParejaPageRoutingModule {}
