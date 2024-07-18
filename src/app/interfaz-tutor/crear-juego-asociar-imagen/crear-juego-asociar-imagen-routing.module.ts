import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearJuegoAsociarImagenPage } from './crear-juego-asociar-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: CrearJuegoAsociarImagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJuegoAsociarImagenPageRoutingModule {}
