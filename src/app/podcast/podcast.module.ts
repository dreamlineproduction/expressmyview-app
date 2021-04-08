import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PodcastPageRoutingModule } from './podcast-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PodcastPage } from './podcast.page';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PodcastPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [PodcastPage, HeroDetailComponent],
  exports: [ HeroDetailComponent],
})
export class PodcastPageModule {}
