"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VjsPlayerModule = void 0;
var angular_1 = require("@ionic/angular");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var vjs_player_component_1 = require("./vjs-player.component");
var VjsPlayerModule = /** @class */ (function () {
    function VjsPlayerModule() {
    }
    VjsPlayerModule = __decorate([
        core_1.NgModule({
            imports: [
                angular_1.IonicModule,
                common_1.CommonModule
            ],
            declarations: [vjs_player_component_1.VjsPlayerComponent],
            exports: [vjs_player_component_1.VjsPlayerComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], VjsPlayerModule);
    return VjsPlayerModule;
}());
exports.VjsPlayerModule = VjsPlayerModule;
