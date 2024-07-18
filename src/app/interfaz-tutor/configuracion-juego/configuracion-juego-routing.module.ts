import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionJuegoPage } from './configuracion-juego.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionJuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionJuegoPageRoutingModule {}
