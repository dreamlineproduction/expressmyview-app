import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivestreamPageRoutingModule } from './livestream-routing.module';

import { LivestreamPage } from './livestream.page';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component'
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivestreamPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [LivestreamPage, HeroDetailComponent],
  exports: [ HeroDetailComponent],
})
export class LivestreamPageModule {}
