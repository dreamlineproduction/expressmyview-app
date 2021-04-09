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
exports.MyaccountPage = void 0;
var core_1 = require("@angular/core");
var popovercomponent_page_1 = require("../popovercomponent/popovercomponent.page");
var MyaccountPage = /** @class */ (function () {
    function MyaccountPage(popoverCtrl, location, server, toastController, loadingController, router, navCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.location = location;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.router = router;
        this.navCtrl = navCtrl;
        this.back = 'assets/icon/back.svg';
        this.logo = 'assets/icon/logo.svg';
        this.menu = 'assets/icon/menu.svg';
        this.search = 'assets/icon/search.svg';
        this.tiger = 'assets/icon/tiger.svg';
        this.checkmark = 'assets/icon/checkmark.svg';
        this.user_image = 'assets/icon/default_user.png';
        this.eye = 'assets/icon/eye.svg';
        this.calendar = 'assets/icon/calendar.svg';
        this.threedots = 'assets/icon/threedots.svg';
        this.title = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
        this.loaded = false;
        this.default_channel = 'assets/icon/default_user.png';
        // async presentPopover(ev: any) {
        //   const popover = await this.popoverCtrl.create({
        //     component: PopovercomponentPage,
        //     cssClass: 'my-custom-class',
        //     event: ev,
        //     translucent: true
        //   });
        //   return await popover.present();
        // }
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
        this.title = this.truncateChar(this.title);
        this.uid = localStorage.getItem("user_id");
    }
    MyaccountPage.prototype.ionViewDidEnter = function () {
        this.loaded = false;
        this.uid = localStorage.getItem("user_id");
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
        this.getMyAccountDatas();
    };
    MyaccountPage.prototype.truncateChar = function (text) {
        var charlimit = 35;
        if (!text || text.length <= charlimit) {
            return text;
        }
        var without_html = text.replace(/<(?:.|\n)*?>/gm, '');
        var shortened = without_html.substring(0, charlimit) + "...";
        return shortened;
    };
    MyaccountPage.prototype.ngOnInit = function () {
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
    };
    MyaccountPage.prototype.goBack = function () {
        this.location.back();
    };
    MyaccountPage.prototype.getMyAccountDatas = function () {
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
                            'userid': this.uid
                        };
                        this.server.getMyAccountDatas(params).subscribe(function (response) {
                            if (response.error == undefined) {
                                console.log("datas", response[0]);
                                _this.myVideos = response[0].myVideos;
                                _this.myVideosLength = _this.myVideos.length;
                                _this.myAudios = response[0].myAudios;
                                _this.myAudiosLength = _this.myAudios.length;
                                _this.myChannels = response[0].myChannels;
                                _this.myChannelsLength = _this.myChannels.length;
                                _this.loaded = true;
                                loading.dismiss();
                            }
                            else {
                                _this.presentToast(response.error);
                                loading.dismiss();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyaccountPage.prototype.presentToast = function (txt) {
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
    MyaccountPage.prototype.presentPopover = function (ev, cid, key1, key2) {
        return __awaiter(this, void 0, void 0, function () {
            var popover, popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(key1 == "channel")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.popoverCtrl.create({
                                component: popovercomponent_page_1.PopovercomponentPage,
                                event: ev,
                                componentProps: {
                                    popupkey1: key1,
                                    popupkey2: key2,
                                    channelid: cid
                                },
                                translucent: true
                            })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.popoverCtrl.create({
                            component: popovercomponent_page_1.PopovercomponentPage,
                            event: ev,
                            componentProps: {
                                popupkey3: key1,
                                popupkey4: key2,
                                channelid: cid
                            },
                            translucent: true
                        })];
                    case 4:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MyaccountPage.prototype.goToChannelDetails = function (id) {
        var navData = {
            queryParams: {
                id: id
            }
        };
        this.router.navigate(['tabs/channel'], navData);
    };
    MyaccountPage.prototype.viewAllChannels = function () {
        this.navCtrl.navigateForward('tabs/mychannels');
    };
    MyaccountPage.prototype.viewAllPodcasts = function (media) {
        var navData = {
            queryParams: {
                media: media
            }
        };
        this.router.navigate(['tabs/my-medias'], navData);
    };
    MyaccountPage = __decorate([
        core_1.Component({
            selector: 'app-myaccount',
            templateUrl: './myaccount.page.html',
            styleUrls: ['./myaccount.page.scss']
        })
    ], MyaccountPage);
    return MyaccountPage;
}());
exports.MyaccountPage = MyaccountPage;
