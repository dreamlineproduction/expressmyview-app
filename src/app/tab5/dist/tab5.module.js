"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tab5PageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var tab5_routing_module_1 = require("./tab5-routing.module");
var explore_container_module_1 = require("../explore-container/explore-container.module");
var tab5_page_1 = require("./tab5.page");
var Tab5PageModule = /** @class */ (function () {
    function Tab5PageModule() {
    }
    Tab5PageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                explore_container_module_1.ExploreContainerComponentModule,
                router_1.RouterModule.forChild([{ path: '', component: tab5_page_1.Tab5Page }]),
                tab5_routing_module_1.Tab5PageRoutingModule
            ],
            declarations: [tab5_page_1.Tab5Page]
        })
    ], Tab5PageModule);
    return Tab5PageModule;
}());
exports.Tab5PageModule = Tab5PageModule;
