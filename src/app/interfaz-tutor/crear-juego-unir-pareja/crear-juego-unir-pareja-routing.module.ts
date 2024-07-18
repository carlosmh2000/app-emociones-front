import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearJuegoUnirParejaPage } from './crear-juego-unir-pareja.page';

const routes: Routes = [
  {
    path: '',
    component: CrearJuegoUnirParejaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJuegoUnirParejaPageRoutingModule {}
