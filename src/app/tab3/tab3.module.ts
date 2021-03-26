import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {
  RoundProgressModule,
  ROUND_PROGRESS_DEFAULTS
  } from 'angular-svg-round-progressbar';

import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    NgxTagsInputModule,
    RoundProgressModule
  ],
  providers: [{
    provide: ROUND_PROGRESS_DEFAULTS,
    useValue: {
      color: '#f00',
      background: '#0f0'
    }
  }],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
