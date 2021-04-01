import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PopovercomponentPageModule } from './popovercomponent/popovercomponent.module';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
// import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';
// import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'  
import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { environment } from '../environments/environment';

const agoraConfig: AgoraConfig = {
  AppID: environment.appID,
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, PopovercomponentPageModule, FontAwesomeModule,
    NgxAgoraModule.forRoot(agoraConfig),],
  providers: [
    ImagePicker,
    StatusBar,
    SplashScreen,Camera,FileChooser,Base64,File,FilePath,FileTransfer, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions,VideoEditor, StreamingMedia, NativeAudio
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) { 
		library.addIconPacks(fas, fab, far);
	}
}
 