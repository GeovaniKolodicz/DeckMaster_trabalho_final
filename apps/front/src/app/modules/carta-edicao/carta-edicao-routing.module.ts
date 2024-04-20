import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormCartaComponent } from './components/form-carta/form-carta.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FormCartaComponent,
    data: {
      id: '',
    },
  },
  {
    path: ':id',
    component: FormCartaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartaEdicaoRoutingModule { }
