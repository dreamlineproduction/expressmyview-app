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
exports.ChannelPage = void 0;
var core_1 = require("@angular/core");
var popovercomponent_page_1 = require("../popovercomponent/popovercomponent.page");
var ChannelPage = /** @class */ (function () {
    function ChannelPage(popoverCtrl, route, server, toastController, loadingController, router) {
        var _this = this;
        this.popoverCtrl = popoverCtrl;
        this.route = route;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.router = router;
        this.title = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
        this.channel = 'assets/icon/channel.svg';
        this.logo = 'assets/icon/logo.svg';
        this.checkmark = 'assets/icon/checkmark.svg';
        this.threedots = 'assets/icon/threedots.svg';
        this.tiger = 'assets/icon/tiger.svg';
        this.bannerPath = 'assets/icon/default_banner.jpeg';
        this.logoPath = 'assets/icon/default_user.png';
        this.loaded = false;
        this.podcastLoaded = false;
        this.myData = false;
        this.isSame = false;
        this.moreData = false;
        this.title = this.truncateChar(this.title);
        this.user_image = localStorage.getItem("user_image");
        this.uid = localStorage.getItem("user_id");
        this.route.queryParams.subscribe(function (data) {
            if (data.myChannel) {
                _this.myData = true;
            }
            _this.cid = data.id;
        });
    }
    ChannelPage.prototype.ionViewDidEnter = function () {
        this.uid = localStorage.getItem("user_id");
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
        this.getChannelDetails();
        this.getChannelPodcasts();
    };
    ChannelPage.prototype.ngOnInit = function () {
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
    };
    ChannelPage.prototype.truncateChar = function (text) {
        var charlimit = 35;
        if (!text || text.length <= charlimit) {
            return text;
        }
        var without_html = text.replace(/<(?:.|\n)*?>/gm, '');
        var shortened = without_html.substring(0, charlimit) + "...";
        return shortened;
    };
    // async presentPopover(ev: any) {
    //   const popover = await this.popoverCtrl.create({
    //     component: PopovercomponentPage,
    //     cssClass: 'my-custom-class',
    //     event: ev,
    //     translucent: true
    //   });
    //   return await popover.present();
    // }
    ChannelPage.prototype.getChannelDetails = function () {
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
                            'channel_id': this.cid,
                            "uid": this.uid
                        };
                        this.server.channelDetails(params).subscribe(function (response) {
                            if (response.error == undefined) {
                                console.log("datas", response[0]);
                                _this.channelDetails = response[0].channelDetails;
                                _this.allPodcastCount = response[0].allPodcastsCount;
                                _this.isSubscribed = response[0].isSubscribed;
                                if (response[0].channelDetails.bannerPath) {
                                    _this.bannerPath = response[0].channelDetails.bannerPath;
                                }
                                if (response[0].channelDetails.logoPath) {
                                    _this.bannerPath = response[0].channelDetails.logoPath;
                                }
                                if (response[0].channelDetails.user_id == _this.uid) {
                                    _this.isSame = true;
                                }
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
    ChannelPage.prototype.getChannelPodcasts = function () {
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
                            'channel_id': this.cid
                        };
                        this.server.getChannelPodcasts(params).subscribe(function (response) {
                            if (response.error == undefined) {
                                console.log("datas", response[0]);
                                _this.allPodcasts = response[0].data;
                                _this.nextPageURL = response[0].next_page_url;
                                if (_this.nextPageURL != null) {
                                    _this.moreData = true;
                                }
                                _this.podcastLoaded = true;
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
    ChannelPage.prototype.doInfinite = function (event) {
        var _this = this;
        console.log("nextPage", this.nextPageURL);
        this.server.loadMorePost(this.nextPageURL + "&channel_id=" + this.cid).subscribe(function (response) {
            console.log("reponse more", response);
            response[0].data.forEach(function (element) {
                _this.allPodcasts.push(element);
            });
            _this.nextPageURL = response[0].next_page_url;
            event.target.complete();
            console.log("nextPagei", _this.nextPageURL);
            if (_this.nextPageURL == null) {
                _this.moreData = false;
            }
        });
    };
    ChannelPage.prototype.presentToast = function (txt) {
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
    ChannelPage.prototype.presentPopover = function (ev, key1, key2) {
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
                                    channelid: this.cid
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
                                channelid: this.cid
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
    ChannelPage.prototype.subscribe = function () {
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
                            id: this.cid,
                            uid: this.uid
                        };
                        this.server.subscribeChannel(params).subscribe(function (response) {
                            if (response.error == undefined) {
                                console.log("like response", response);
                                if (response.action == "subscribed") {
                                    _this.isSubscribed = true;
                                }
                                else {
                                    _this.isSubscribed = false;
                                }
                                _this.presentToast(response.msg);
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
    ChannelPage.prototype.goToPlay = function (id) {
        var navData = {
            queryParams: {
                id: id
            }
        };
        this.router.navigate(['tabs/podcast'], navData);
    };
    ChannelPage = __decorate([
        core_1.Component({
            selector: 'app-channel',
            templateUrl: './channel.page.html',
            styleUrls: ['./channel.page.scss']
        })
    ], ChannelPage);
    return ChannelPage;
}());
exports.ChannelPage = ChannelPage;
