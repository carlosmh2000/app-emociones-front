import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionAlumnoPage } from './configuracion-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionAlumnoPageRoutingModule {}
