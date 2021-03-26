import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpodcastPageRoutingModule } from './editpodcast-routing.module';

import { EditpodcastPage } from './editpodcast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpodcastPageRoutingModule
  ],
  declarations: [EditpodcastPage]
})
export class EditpodcastPageModule {}
