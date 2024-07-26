import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearJuegoElegirEmocionPage } from './crear-juego-elegir-emocion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearJuegoElegirEmocionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJuegoElegirEmocionPageRoutingModule {}
