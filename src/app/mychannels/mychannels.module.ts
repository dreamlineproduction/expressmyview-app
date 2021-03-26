import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MychannelsPageRoutingModule } from './mychannels-routing.module';

import { MychannelsPage } from './mychannels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MychannelsPageRoutingModule
  ],
  declarations: [MychannelsPage]
})
export class MychannelsPageModule {}
