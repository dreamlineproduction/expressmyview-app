import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { IonicModule } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { LivestreamPageRoutingModule } from './livestream-routing.module';

import { LivestreamPage } from './livestream.page';

const agoraConfig: AgoraConfig = {
  AppID: environment.appID,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxAgoraModule.forRoot(agoraConfig),
    LivestreamPageRoutingModule
  ],
  declarations: [LivestreamPage]
})
export class LivestreamPageModule {}
