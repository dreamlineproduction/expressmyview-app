"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubcommentsPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var subcomments_routing_module_1 = require("./subcomments-routing.module");
var subcomments_page_1 = require("./subcomments.page");
var SubcommentsPageModule = /** @class */ (function () {
    function SubcommentsPageModule() {
    }
    SubcommentsPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                subcomments_routing_module_1.SubcommentsPageRoutingModule,
                angular_fontawesome_1.FontAwesomeModule
            ],
            declarations: [subcomments_page_1.SubcommentsPage]
        })
    ], SubcommentsPageModule);
    return SubcommentsPageModule;
}());
exports.SubcommentsPageModule = SubcommentsPageModule;
