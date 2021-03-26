"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(location, navCtrl, platform, splashScreen, statusBar, menu, 
    // private agoraService: AngularAgoraRtcService,
    // private ngxAgoraService: NgxAgoraService,
    androidPermissions) {
        this.location = location;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.menu = menu;
        this.androidPermissions = androidPermissions;
        this.title = 'AgoraDemo';
        // private localStream: Stream;
        // private client: AgoraClient;
        this.logo = 'assets/icon/logo.svg';
        this.myAccount = 'assets/icon/myAccount.svg';
        this.myChannels = 'assets/icon/myChannels.svg';
        this.mySubscriptions = 'assets/icon/mySubscriptions.svg';
        this.createChannel = 'assets/icon/createChannel.svg';
        this.accountSettings = 'assets/icon/accountSettings.svg';
        this.iosCordova = false;
        this.androidCordova = false;
        this.remoteCalls = [];
        this.initializeApp();
        // this.client = this.ngxAgoraService.createClient({ mode: 'live', codec: 'h264' });
        // this.client.setClientRole("audience");
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.iosCordova = this.platform.is('ios');
        this.androidCordova = this.platform.is('android');
        this.platform.ready().then(function () {
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
            _this.statusBar.styleDefault();
            _this.menu.close('first');
            var userid = localStorage.getItem('user_id');
            _this.user_image = localStorage.getItem('user_image');
            // let useremail =  localStorage.getItem('user_email');
            // let username =  localStorage.getItem('username');
            // if(userid == '' || typeof userid === undefined || userid == null || userid == 'null'){
            //   this.navCtrl.navigateForward('login');
            // }
        });
    };
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
    AppComponent.prototype.openMyAccount = function () {
        this.navCtrl.navigateForward('tabs/myaccount');
        this.splashScreen.hide();
    };
    AppComponent.prototype.openMyChannels = function () {
        this.navCtrl.navigateForward('tabs/mychannels');
        this.splashScreen.hide();
    };
    AppComponent.prototype.openMySubscriptions = function () {
        this.navCtrl.navigateForward('tabs/mysubscriptions');
        this.splashScreen.hide();
    };
    AppComponent.prototype.openCreateChannel = function () {
        this.navCtrl.navigateForward('tabs/createchannels');
        this.splashScreen.hide();
    };
    AppComponent.prototype.openAccountSettings = function () {
        this.navCtrl.navigateForward('tabs/accountsettings');
        this.splashScreen.hide();
    };
    AppComponent.prototype.goBack = function () {
        this.location.back();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
