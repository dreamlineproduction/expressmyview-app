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
exports.Tab1Page = void 0;
var core_1 = require("@angular/core");
var Tab1Page = /** @class */ (function () {
    function Tab1Page(navCtrl, server, toastController, loadingController, router) {
        this.navCtrl = navCtrl;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.router = router;
        this.logo = 'assets/icon/logo.svg';
        this.logout_icon = 'assets/icon/menu.svg';
        this.search = 'assets/icon/search.svg';
        this.tiger = 'assets/icon/tiger.svg';
        this.checkmark = 'assets/icon/checkmark.svg';
        this.eye = 'assets/icon/eye.svg';
        this.calendar = 'assets/icon/calendar.svg';
        this.loaded = false;
        this.slideOpts = {
            initialSlide: 1,
            speed: 400,
            on: {
                beforeInit: function () {
                    var swiper = this;
                    swiper.classNames.push(swiper.params.containerModifierClass + "fade");
                    var overwriteParams = {
                        slidesPerView: 3.5,
                        autoplay: true,
                        spaceBetween: -15,
                        centeredSlides: false
                    };
                    swiper.params = Object.assign(swiper.params, overwriteParams);
                    swiper.params = Object.assign(swiper.originalParams, overwriteParams);
                }
            }
        };
        this.uid = localStorage.getItem("user_id");
        this.user_image = localStorage.getItem("user_image");
        this.getHomeDatas();
    }
    Tab1Page.prototype.getHomeDatas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading, params;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        params = {
                            'id': this.uid
                        };
                        this.server.getHomeDatas(params).subscribe(function (response) {
                            if (response.error == undefined) {
                                console.log("datas", response[0]);
                                _this.latestVideoPodcasts = response[0].latestVideoPodcasts;
                                _this.popularChannels = response[0].popularChannels;
                                _this.streamingNows = response[0].liveStreams;
                                if (response[0].appID) {
                                    localStorage.setItem("appID", response[0].appID);
                                }
                                _this.loaded = true;
                                loading.dismiss();
                            }
                            else {
                                _this.presentToast(response.error);
                                if (response[0].appID) {
                                    localStorage.setItem("appID", response[0].appID);
                                }
                                loading.dismiss();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.presentToast = function (txt) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: txt,
                            duration: 3000,
                            position: 'top',
                            mode: 'ios',
                            color: 'dark'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.goToChannelDetails = function (id) {
        var navData = {
            queryParams: {
                id: id
            }
        };
        this.router.navigate(['tabs/channel'], navData);
    };
    Tab1Page.prototype.goToPlay = function (id) {
        var navData = {
            queryParams: {
                id: id
            }
        };
        this.router.navigate(['tabs/podcast'], navData);
    };
    Tab1Page.prototype.searchPage = function () {
        this.server.presentModal();
    };
    Tab1Page = __decorate([
        core_1.Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        })
    ], Tab1Page);
    return Tab1Page;
}());
exports.Tab1Page = Tab1Page;
