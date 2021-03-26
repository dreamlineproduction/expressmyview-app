import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditchannelPage } from './editchannel.page';

const routes: Routes = [
  {
    path: '',
    component: EditchannelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditchannelPageRoutingModule {}
