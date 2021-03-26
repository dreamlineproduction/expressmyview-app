"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TabsPage = void 0;
var core_1 = require("@angular/core");
var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.home = 'assets/icon/home.svg';
        this.listing = 'assets/icon/listing.svg';
        this.upload = 'assets/icon/upload.svg';
        this.podcast = 'assets/icon/podcast.svg';
        this.live = 'assets/icon/live.svg';
        this.clickedHomeIcon = 'assets/icon/clickedHomeIcon.svg';
        this.clickedListIcon = 'assets/icon/clickedListIcon.svg';
        this.clickedUploadIcon = 'assets/icon/clickedUploadIcon.svg';
        this.clickedPodcastIcon = 'assets/icon/clickedPodcastIcon.svg';
        this.clickedLiveIcon = 'assets/icon/clickedLiveIcon.svg';
        this.isHomeSelected = false;
        this.isListingSelected = false;
        this.isUploadSelected = false;
        this.isPodcastSelected = false;
        this.isLiveSelected = false;
        this.isHomeSelected = true;
    }
    TabsPage.prototype.changeHomeIcon = function () {
        this.resetAll();
        this.isHomeSelected = true;
    };
    TabsPage.prototype.changeListingIcon = function () {
        this.resetAll();
        this.isListingSelected = true;
    };
    TabsPage.prototype.changeUploadIcon = function () {
        this.resetAll();
        this.isUploadSelected = true;
    };
    TabsPage.prototype.changePodcastIcon = function () {
        this.resetAll();
        this.isPodcastSelected = true;
    };
    TabsPage.prototype.changeLiveIcon = function () {
        this.resetAll();
        this.isLiveSelected = true;
    };
    TabsPage.prototype.resetAll = function () {
        this.isHomeSelected = false;
        this.isListingSelected = false;
        this.isUploadSelected = false;
        this.isPodcastSelected = false;
        this.isLiveSelected = false;
    };
    TabsPage = __decorate([
        core_1.Component({
            selector: 'app-tabs',
            templateUrl: 'tabs.page.html',
            styleUrls: ['tabs.page.scss']
        })
    ], TabsPage);
    return TabsPage;
}());
exports.TabsPage = TabsPage;
