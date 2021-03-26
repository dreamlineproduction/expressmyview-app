"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var ngx_1 = require("@ionic-native/splash-screen/ngx");
var ngx_2 = require("@ionic-native/status-bar/ngx");
var ngx_3 = require("@ionic-native/camera/ngx");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/common/http");
var popovercomponent_module_1 = require("./popovercomponent/popovercomponent.module");
var ngx_4 = require("@ionic-native/image-picker/ngx");
var ngx_5 = require("@ionic-native/file-chooser/ngx");
var ngx_6 = require("@ionic-native/base64/ngx");
var ngx_7 = require("@ionic-native/file/ngx");
var ngx_8 = require("@ionic-native/file-path/ngx");
var ngx_9 = require("@ionic-native/file-transfer/ngx");
// import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';
// import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
var ngx_10 = require("@ionic-native/android-permissions/ngx");
var ngx_11 = require("@ionic-native/video-editor/ngx");
var ngx_12 = require("@ionic-native/streaming-media/ngx");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var free_regular_svg_icons_1 = require("@fortawesome/free-regular-svg-icons");
var free_brands_svg_icons_1 = require("@fortawesome/free-brands-svg-icons");
//   AppID: '03008fea3c2c4744995b487ac6ca59e6',
// };
var AppModule = /** @class */ (function () {
    function AppModule(library) {
        library.addIconPacks(free_solid_svg_icons_1.fas, free_brands_svg_icons_1.fab, free_regular_svg_icons_1.far);
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            entryComponents: [],
            imports: [platform_browser_1.BrowserModule, angular_1.IonicModule.forRoot(), app_routing_module_1.AppRoutingModule, http_1.HttpClientModule, popovercomponent_module_1.PopovercomponentPageModule, angular_fontawesome_1.FontAwesomeModule],
            providers: [
                ngx_4.ImagePicker,
                ngx_2.StatusBar,
                ngx_1.SplashScreen, ngx_3.Camera, ngx_5.FileChooser, ngx_6.Base64, ngx_7.File, ngx_8.FilePath, ngx_9.FileTransfer,
                { provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy },
                ngx_10.AndroidPermissions, ngx_11.VideoEditor, ngx_12.StreamingMedia
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
