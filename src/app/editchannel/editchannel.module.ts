import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditchannelPageRoutingModule } from './editchannel-routing.module';

import { EditchannelPage } from './editchannel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditchannelPageRoutingModule
  ],
  declarations: [EditchannelPage]
})
export class EditchannelPageModule {}
