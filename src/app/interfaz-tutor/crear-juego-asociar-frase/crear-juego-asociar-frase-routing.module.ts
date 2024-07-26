import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearJuegoAsociarFrasePage } from './crear-juego-asociar-frase.page';

const routes: Routes = [
  {
    path: '',
    component: CrearJuegoAsociarFrasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJuegoAsociarFrasePageRoutingModule {}
