import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatechannelsPage } from './createchannels.page';

const routes: Routes = [
  {
    path: '',
    component: CreatechannelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatechannelsPageRoutingModule {}
