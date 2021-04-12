import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsPageRoutingModule } from './comments-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CommentsPage } from './comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    FontAwesomeModule 
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
