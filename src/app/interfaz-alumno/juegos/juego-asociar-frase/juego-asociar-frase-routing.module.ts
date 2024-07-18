import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoAsociarFrasePage } from './juego-asociar-frase.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoAsociarFrasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoAsociarFrasePageRoutingModule {}
