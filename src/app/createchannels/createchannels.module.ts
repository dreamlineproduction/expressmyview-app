import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatechannelsPageRoutingModule } from './createchannels-routing.module';

import { CreatechannelsPage } from './createchannels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatechannelsPageRoutingModule
  ],
  declarations: [CreatechannelsPage]
})
export class CreatechannelsPageModule {}
