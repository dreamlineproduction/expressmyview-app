import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MychannelsPage } from './mychannels.page';

const routes: Routes = [
  {
    path: '',
    component: MychannelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MychannelsPageRoutingModule {}
