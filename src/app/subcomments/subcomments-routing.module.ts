import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubcommentsPage } from './subcomments.page';

const routes: Routes = [
  {
    path: '',
    component: SubcommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcommentsPageRoutingModule {}
