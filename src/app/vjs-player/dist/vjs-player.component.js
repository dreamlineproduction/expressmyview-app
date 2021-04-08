"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VjsPlayerComponent = void 0;
var core_1 = require("@angular/core");
var video_js_1 = require("video.js");
var VjsPlayerComponent = /** @class */ (function () {
    function VjsPlayerComponent(elementRef) {
        this.elementRef = elementRef;
    }
    VjsPlayerComponent.prototype.ngOnInit = function () {
        // instantiate Video.js
        this.player = video_js_1["default"](this.target.nativeElement, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        });
    };
    VjsPlayerComponent.prototype.ngOnDestroy = function () {
        // destroy player
        if (this.player) {
            this.player.dispose();
        }
    };
    __decorate([
        core_1.ViewChild('target', { static: true })
    ], VjsPlayerComponent.prototype, "target");
    __decorate([
        core_1.Input()
    ], VjsPlayerComponent.prototype, "options");
    VjsPlayerComponent = __decorate([
        core_1.Component({
            selector: 'app-player',
            template: "\n    <video #target class=\"video-js\" controls muted playsinline preload=\"none\"></video>\n  ",
            styleUrls: [
                './vjs-player.component.scss'
            ],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], VjsPlayerComponent);
    return VjsPlayerComponent;
}());
exports.VjsPlayerComponent = VjsPlayerComponent;
