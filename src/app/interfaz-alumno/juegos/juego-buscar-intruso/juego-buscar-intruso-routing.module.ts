import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoBuscarIntrusoPage } from './juego-buscar-intruso.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoBuscarIntrusoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoBuscarIntrusoPageRoutingModule {}
