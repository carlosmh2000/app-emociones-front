import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearJuegoPage } from './crear-juego.page';

const routes: Routes = [
  {
    path: '',
    component: CrearJuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJuegoPageRoutingModule {}
