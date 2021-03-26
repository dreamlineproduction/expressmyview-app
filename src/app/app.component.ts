import { Component } from '@angular/core';
import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Location } from '@angular/common';
// import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc'; 
// import { NgxAgoraService  , Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'AgoraDemo';
  // private localStream: Stream;
  // private client: AgoraClient;
  logo:string='assets/icon/logo.svg';
  myAccount:string='assets/icon/myAccount.svg';
  myChannels:string='assets/icon/myChannels.svg';
  mySubscriptions:string='assets/icon/mySubscriptions.svg';
  createChannel:string='assets/icon/createChannel.svg';
  accountSettings:string='assets/icon/accountSettings.svg';
  iosCordova = false; 
  androidCordova = false;
  remoteCalls: string[] = [];
  user_image:any;
  constructor(
    private location: Location,
    public navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    // private agoraService: AngularAgoraRtcService,
    // private ngxAgoraService: NgxAgoraService,
    private androidPermissions: AndroidPermissions,
  ) {
    this.initializeApp();
    // this.client = this.ngxAgoraService.createClient({ mode: 'live', codec: 'h264' });
    // this.client.setClientRole("audience");
  }

  initializeApp() {
    this.iosCordova = this.platform.is('ios');
    this.androidCordova = this.platform.is('android');   
    this.platform.ready().then(() => {
      // if( this.androidCordova ){ 
      //   this.androidPermissions.requestPermissions(
      //   [
      //       this.androidPermissions.PERMISSION.CAMERA, 
      //       this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
      //       this.androidPermissions.PERMISSION.RECORD_AUDIO
      //   ]
      //   ).then(()=>{
      //     console.log("done");
      //   })
      // }
      this.statusBar.styleDefault();
      this.menu.close('first');
      let userid =  localStorage.getItem('user_id');
      this.user_image  = localStorage.getItem('user_image');
      // let useremail =  localStorage.getItem('user_email');
      // let username =  localStorage.getItem('username');
      // if(userid == '' || typeof userid === undefined || userid == null || userid == 'null'){
      //   this.navCtrl.navigateForward('login');
      // }
    });
  }

  // startCall() {
  //   this.agoraService.client.join(null, '1000', null, (uid) => {
  //     this.localStream = this.agoraService.createStream({
  //       streamID: uid,
  //       audio:true,
  //       video:true,
  //       screen:false
  //     });
  //     this.localStream.setVideoProfile('720p_3');
  //     this.assignClientHandlers();
  //   });
  // }

  // private startCall() {
  //   this.ngxAgoraService.client.join(null, '1000', null, (uid) => {
  //     this.localStream = this.ngxAgoraService.createStream({
  //       streamID: uid,
  //       audio:true,
  //       video:true,
  //       screen:false
  //     });
  //     this.localStream.setVideoProfile('720p_3');
  //   });
    
  //   this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
  //     console.log('accessAllowed');
  //   });
    
  //   this.localStream.on(StreamEvent.MediaAccessDenied, () => {
  //     console.log('accessDenied');
  //   });
  //   this.localStream.init(
  //     () => {
  //       console.log('getUserMedia successfully');
  //       this.localStream.play('agora_local');
  //       this.client.publish(this.localStream, (err) =>
  //         console.log('Publish local stream error: ' + err)
  //       );
  //       this.client.on(ClientEvent.LocalStreamPublished, (evt) =>
  //         console.log('Publish local stream successfully')
  //       );
  //     },
  //     (err) => console.log('getUserMedia failed', err)
  //   );

  //   this.client.on(ClientEvent.Error, error => {
  //     console.log('Got error msg:', error.reason);
  //     if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
  //       this.client.renewChannelKey(
  //         '',
  //         () => console.log('Renewed the channel key successfully.'),
  //         renewError => console.error('Renew channel key failed: ', renewError)
  //       );
  //     }
  //   });

  //   // this.client.on(ClientEvent.RemoteStreamAdded, evt => {
  //   //   const stream = evt.stream as Stream;
  //   //   this.client.subscribe(stream, { audio: true, video: true }, err => {
  //   //     console.log('Subscribe stream failed', err);
  //   //   });
  //   // });

  //   // this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
  //   //   const stream = evt.stream as Stream;
  //   //   const id = this.getRemoteId(stream);
  //   //   if (!this.remoteCalls.length) {
  //   //     this.remoteCalls.push(id);
  //   //     setTimeout(() => stream.play(id), 1000);
  //   //   }
  //   // });

  //   // this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
  //   //   const stream = evt.stream as Stream;
  //   //   if (stream) {
  //   //     stream.stop();
  //   //     this.remoteCalls = [];
  //   //     console.log(`Remote stream is removed ${stream.getId()}`);
  //   //   }
  //   // });

  //   // this.client.on(ClientEvent.PeerLeave, evt => {
  //   //   const stream = evt.stream as Stream;
  //   //   if (stream) {
  //   //     stream.stop();
  //   //     this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
  //   //     console.log(`${evt.uid} left from this channel`);
  //   //   }
  //   // });
  // }

  
  openMyAccount(){
    this.navCtrl.navigateForward('tabs/myaccount');
    this.splashScreen.hide();
  }

  openMyChannels(){
    this.navCtrl.navigateForward('tabs/mychannels');
    this.splashScreen.hide();
  }

  openMySubscriptions(){
    this.navCtrl.navigateForward('tabs/mysubscriptions');
    this.splashScreen.hide();
  }

  openCreateChannel(){
    this.navCtrl.navigateForward('tabs/createchannels');
    this.splashScreen.hide();
  }

  openAccountSettings(){
    this.navCtrl.navigateForward('tabs/accountsettings');
    this.splashScreen.hide();
  }

  goBack() {
    this.location.back();
  }

  // private getRemoteId(stream: Stream): string {
  //   return `agora_remote-${stream.getId()}`;
  // }

}
