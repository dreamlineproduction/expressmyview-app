import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PodcastPageRoutingModule } from './podcast-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PodcastPage } from './podcast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PodcastPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [PodcastPage]
})
export class PodcastPageModule {}
