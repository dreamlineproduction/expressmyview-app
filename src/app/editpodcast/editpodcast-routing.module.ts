import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpodcastPage } from './editpodcast.page';

const routes: Routes = [
  {
    path: '',
    component: EditpodcastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpodcastPageRoutingModule {}
