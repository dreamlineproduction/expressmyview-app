"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeroDetailComponent = void 0;
var core_1 = require("@angular/core");
var video_js_1 = require("video.js");
require("video.js/dist/video-js.css");
require("videojs-landscape-fullscreen");
require("@silvermine/videojs-quality-selector");
var HeroDetailComponent = /** @class */ (function () {
    function HeroDetailComponent(elementRef, screenOrientation) {
        this.elementRef = elementRef;
        this.screenOrientation = screenOrientation;
        this.isFullScreen = false;
    }
    HeroDetailComponent.prototype.initVideo = function (stream) {
        this.player.src({ src: stream, type: "appliction/webrtc" });
    };
    HeroDetailComponent.prototype.ngOnInit = function () {
        this.player = video_js_1["default"](this.target.nativeElement, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        });
        var screenOrientation = this.screenOrientation;
        this.player.on('fullscreenchange', function () {
            console.log("screen change");
            if (this.isFullScreen) {
                this.isFullScreen = false;
                screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            else {
                this.isFullScreen = true;
                screenOrientation.lock(screenOrientation.ORIENTATIONS.LANDSCAPE);
            }
        });
    };
    HeroDetailComponent.prototype.ngOnDestroy = function () {
        // destroy player
        if (this.player) {
            this.player.dispose();
        }
    };
    __decorate([
        core_1.ViewChild('target', { static: true })
    ], HeroDetailComponent.prototype, "target");
    __decorate([
        core_1.Input()
    ], HeroDetailComponent.prototype, "options");
    HeroDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-hero-detail',
            template: "\n    <video #target class=\"video-js vjs-big-play-centered\" controls muted playsinline preload=\"none\"></video>\n  ",
            styleUrls: ['./hero-detail.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], HeroDetailComponent);
    return HeroDetailComponent;
}());
exports.HeroDetailComponent = HeroDetailComponent;
