import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearJuegoBuscarIntrusoPage } from './crear-juego-buscar-intruso.page';

const routes: Routes = [
  {
    path: '',
    component: CrearJuegoBuscarIntrusoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJuegoBuscarIntrusoPageRoutingModule {}
