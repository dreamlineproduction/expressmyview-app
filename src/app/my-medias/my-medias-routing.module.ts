import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMediasPage } from './my-medias.page';

const routes: Routes = [
  {
    path: '',
    component: MyMediasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMediasPageRoutingModule {}
