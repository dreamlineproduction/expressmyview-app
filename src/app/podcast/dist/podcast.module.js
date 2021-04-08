"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PodcastPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var podcast_routing_module_1 = require("./podcast-routing.module");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var podcast_page_1 = require("./podcast.page");
var hero_detail_component_1 = require("../hero-detail/hero-detail.component");
var PodcastPageModule = /** @class */ (function () {
    function PodcastPageModule() {
    }
    PodcastPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                podcast_routing_module_1.PodcastPageRoutingModule,
                angular_fontawesome_1.FontAwesomeModule
            ],
            declarations: [podcast_page_1.PodcastPage, hero_detail_component_1.HeroDetailComponent],
            exports: [hero_detail_component_1.HeroDetailComponent]
        })
    ], PodcastPageModule);
    return PodcastPageModule;
}());
exports.PodcastPageModule = PodcastPageModule;
