import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoUnirColorPage } from './juego-unir-color.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoUnirColorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoUnirColorPageRoutingModule {}
