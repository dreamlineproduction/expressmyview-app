"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tab4PageModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var tab4_routing_module_1 = require("./tab4-routing.module");
var explore_container_module_1 = require("../explore-container/explore-container.module");
var tab4_page_1 = require("./tab4.page");
var Tab4PageModule = /** @class */ (function () {
    function Tab4PageModule() {
    }
    Tab4PageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                explore_container_module_1.ExploreContainerComponentModule,
                router_1.RouterModule.forChild([{ path: '', component: tab4_page_1.Tab4Page }]),
                tab4_routing_module_1.Tab4PageRoutingModule
            ],
            declarations: [tab4_page_1.Tab4Page]
        })
    ], Tab4PageModule);
    return Tab4PageModule;
}());
exports.Tab4PageModule = Tab4PageModule;
