import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMediasPageRoutingModule } from './my-medias-routing.module';

import { MyMediasPage } from './my-medias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMediasPageRoutingModule
  ],
  declarations: [MyMediasPage]
})
export class MyMediasPageModule {}
