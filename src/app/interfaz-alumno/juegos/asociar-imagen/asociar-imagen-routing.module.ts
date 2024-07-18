import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsociarImagenPage } from './asociar-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: AsociarImagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsociarImagenPageRoutingModule {}
