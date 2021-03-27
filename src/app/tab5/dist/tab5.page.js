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
exports.Tab5Page = void 0;
var core_1 = require("@angular/core");
var Tab5Page = /** @class */ (function () {
    function Tab5Page(navCtrl, server, toastController, loadingController, router) {
        this.navCtrl = navCtrl;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.router = router;
        this.logo = 'assets/icon/logo.svg';
        this.default_podcast = 'assets/icon/default_podcast.jpeg';
        this.menu = 'assets/icon/menu.svg';
        this.search = 'assets/icon/search.svg';
        this.tiger = 'assets/icon/tiger.svg';
        this.checkmark = 'assets/icon/checkmark.svg';
        this.eye = 'assets/icon/eye.svg';
        this.user_image = 'assets/icon/default_user.png';
        this.calendar = 'assets/icon/calendar.svg';
        this.title = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
        this.loaded = false;
        this.moreData = false;
        this.title = this.truncateChar(this.title);
        this.uid = localStorage.getItem("user_id");
        this.getAllPodcasts();
    }
    Tab5Page.prototype.truncateChar = function (text) {
        var charlimit = 50;
        if (!text || text.length <= charlimit) {
            return text;
        }
        var without_html = text.replace(/<(?:.|\n)*?>/gm, '');
        var shortened = without_html.substring(0, charlimit) + "...";
        return shortened;
    };
    Tab5Page.prototype.getAllPodcasts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
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
                        this.server.getLiveStreams("").subscribe(function (response) {
                            if (response.error == undefined) {
                                console.log("datas", response.streams);
                                _this.allVideoPodcasts = response.streams.data;
                                _this.nextPageURL = response.streams.next_page_url;
                                if (_this.nextPageURL != null) {
                                    _this.moreData = true;
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
    Tab5Page.prototype.doInfinite = function (event) {
        var _this = this;
        console.log("nextPage", this.nextPageURL);
        this.server.loadMorePost(this.nextPageURL).subscribe(function (response) {
            console.log("reponse more", response);
            response.streams.data.forEach(function (element) {
                _this.allVideoPodcasts.push(element);
            });
            _this.nextPageURL = response.streams.next_page_url;
            event.target.complete();
            console.log("nextPagei", _this.nextPageURL);
            if (_this.nextPageURL == null) {
                _this.moreData = false;
            }
        });
    };
    Tab5Page.prototype.presentToast = function (txt) {
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
    Tab5Page.prototype.goToChannelDetails = function (id) {
        var navData = {
            queryParams: {
                id: id
            }
        };
        this.router.navigate(['tabs/channel'], navData);
    };
    Tab5Page.prototype.ngOnInit = function () {
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
    };
    Tab5Page.prototype.goToPlay = function (lid) {
        var navData = {
            queryParams: {
                id: this.uid,
                lid: lid
            }
        };
        this.router.navigate(['tabs/livestream'], navData);
    };
    Tab5Page = __decorate([
        core_1.Component({
            selector: 'app-tab5',
            templateUrl: './tab5.page.html',
            styleUrls: ['./tab5.page.scss']
        })
    ], Tab5Page);
    return Tab5Page;
}());
exports.Tab5Page = Tab5Page;
