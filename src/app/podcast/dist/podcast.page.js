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
exports.PodcastPage = void 0;
var core_1 = require("@angular/core");
var PodcastPage = /** @class */ (function () {
    function PodcastPage(location, navCtrl, server, toastController, loadingController, streamingMedia, route, router) {
        var _this = this;
        this.location = location;
        this.navCtrl = navCtrl;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.streamingMedia = streamingMedia;
        this.route = route;
        this.router = router;
        this.logo = 'assets/icon/logo.svg';
        this.logout_icon = 'assets/icon/menu.svg';
        this.search = 'assets/icon/search.svg';
        this.user_image = 'assets/icon/default_user.png';
        this.tiger = 'assets/icon/tiger.svg';
        this.play = 'assets/icon/play.svg';
        this.checkmark = 'assets/icon/checkmark.svg';
        this.eye = 'assets/icon/eye.svg';
        this.calendar = 'assets/icon/calendar.svg';
        this.back = 'assets/icon/back.svg';
        this.loaded = false;
        this.podcastDetails = [];
        this.relatedPodcasts = [];
        this.newrelatedPodcasts = [];
        this.isSame = false;
        this.route.queryParams.subscribe(function (data) {
            _this.pid = data.id;
        });
        this.uid = localStorage.getItem("user_id");
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
        this.getPodcastDetails();
    }
    PodcastPage.prototype.ngOnInit = function () {
    };
    PodcastPage.prototype.toFullScreen = function () {
        var elem = this.videoElement.nativeElement;
        // var elem = document.getElementById("video");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    };
    PodcastPage.prototype.goBack = function () {
        this.location.back();
    };
    // mediaPlay() {
    //   this.videoPlayer.play('http://expressmyview.crtvecode.in/uploads/0xxKzADjM0_undefined_1615285748.mp4').then(() => {
    //     console.log('video finished');
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // }
    // mediaPlay(){
    //   let options: StreamingVideoOptions = {
    //     successCallback: () => { console.log('Video played') },
    //     errorCallback: (e) => { console.log('Error streaming') },
    //     orientation: 'potrait',
    //     shouldAutoClose: true,
    //     controls: true
    //   };
    //   this.streamingMedia.playVideo('http://expressmyview.crtvecode.in/uploads/0xxKzADjM0_undefined_1615285748.mp4', options);
    // }
    PodcastPage.prototype.getPodcastDetails = function () {
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
                            id: this.pid,
                            uid: this.uid
                        };
                        this.server.getPodcastDetails(params).subscribe(function (response) {
                            console.log("response", response[0]);
                            if (response.error == undefined) {
                                _this.relatedPodcasts = response[0].relatedPodcasts;
                                _this.podcastDetails = response[0].podcast;
                                _this.channelName = response[0].channelName;
                                _this.casts = response[0].casts;
                                _this.tags = response[0].tags;
                                _this.categories = response[0].categories;
                                _this.isSubscribed = response[0].isSubscribed;
                                _this.isLiked = response[0].isLiked;
                                _this.fullHD = response[0].podcast.videoPath;
                                if (response[0].podcast.user_id == _this.uid) {
                                    _this.isSame = true;
                                }
                                // for(let i = 0; i < this.relatedPodcasts.length; i++){
                                //   console.log(this.newrelatedPodcasts[i], "podcast");
                                //   this.relatedPodcasts.push(this.newrelatedPodcasts[i]);
                                // }
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
    PodcastPage.prototype.presentToast = function (txt) {
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
    PodcastPage.prototype.like = function () {
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
                            pid: this.pid,
                            uid: this.uid
                        };
                        this.server.likePodcast(params).subscribe(function (response) {
                            if (response.error == undefined) {
                                console.log("like response", response);
                                if (response.action == "liked") {
                                    _this.isLiked = true;
                                }
                                else {
                                    _this.isLiked = false;
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
    PodcastPage.prototype.subscribe = function () {
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
                            pid: this.pid,
                            uid: this.uid
                        };
                        this.server.subscribePodcast(params).subscribe(function (response) {
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
    PodcastPage.prototype.goToChannelDetails = function (id) {
        var navData = {
            queryParams: {
                id: id
            }
        };
        this.router.navigate(['tabs/channel'], navData);
    };
    PodcastPage.prototype.goToPlay = function (id) {
        var navData = {
            queryParams: {
                id: id
            }
        };
        this.router.navigate(['tabs/podcast'], navData);
        this.pid = id;
        this.getPodcastDetails();
    };
    __decorate([
        core_1.ViewChild('video')
    ], PodcastPage.prototype, "videoElement");
    PodcastPage = __decorate([
        core_1.Component({
            selector: 'app-podcast',
            templateUrl: './podcast.page.html',
            styleUrls: ['./podcast.page.scss']
        })
    ], PodcastPage);
    return PodcastPage;
}());
exports.PodcastPage = PodcastPage;
