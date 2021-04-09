"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(location, navCtrl, platform, splashScreen, statusBar, menu, 
    // private agoraService: AngularAgoraRtcService,
    // private ngxAgoraService: NgxAgoraService,
    androidPermissions, server, toastController, loadingController) {
        this.location = location;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.menu = menu;
        this.androidPermissions = androidPermissions;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
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
            _this.uid = localStorage.getItem('user_id');
            _this.getuser();
            // let useremail =  localStorage.getItem('user_email');
            // let username =  localStorage.getItem('username');
            // if(userid == '' || typeof userid === undefined || userid == null || userid == 'null'){
            //   this.navCtrl.navigateForward('login');
            // }
        });
    };
    AppComponent.prototype.getuser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    'id': this.uid
                };
                this.server.getuser(params).subscribe(function (response) {
                    if (response.error == undefined) {
                        _this.user_image = response.user_profile[0].imagePath;
                        localStorage.setItem('user_image', _this.user_image);
                    }
                });
                return [2 /*return*/];
            });
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
