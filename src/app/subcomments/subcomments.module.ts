import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubcommentsPageRoutingModule } from './subcomments-routing.module';

import { SubcommentsPage } from './subcomments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcommentsPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [SubcommentsPage]
})
export class SubcommentsPageModule {}
