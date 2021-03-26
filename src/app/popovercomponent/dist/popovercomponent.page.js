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
exports.PopovercomponentPage = void 0;
var core_1 = require("@angular/core");
var PopovercomponentPage = /** @class */ (function () {
    function PopovercomponentPage(popover, navCtrl, modalCtrl, route, router, alertController, toastController, loadingController, server) {
        this.popover = popover;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.route = route;
        this.router = router;
        this.alertController = alertController;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.server = server;
    }
    PopovercomponentPage.prototype.ngOnInit = function () {
    };
    PopovercomponentPage.prototype.ClosePopover = function () {
        this.popover.dismiss();
    };
    PopovercomponentPage.prototype.editChannel = function (id) {
        var navData = {
            queryParams: {
                id: id,
                cid: this.channelid
            }
        };
        this.router.navigate(['tabs/editchannel'], navData);
        this.DismissClick();
    };
    PopovercomponentPage.prototype.deleteChannel = function (id) {
        this.confirmDeleteChannel(id);
        this.DismissClick();
    };
    PopovercomponentPage.prototype.confirmDeleteChannel = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Confirm!',
                            message: '<strong>You are about to delete this channel. This action is irreversible.</strong>!!!',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'OK',
                                    handler: function () {
                                        _this.deleteChannelConfirmed(id);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopovercomponentPage.prototype.deleteChannelConfirmed = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var param, loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            id: id
                        };
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please wait...'
                            })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.server.deleteChannel(param).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.presentToast("Channel deleted Successfully");
                                _this.navCtrl.navigateForward('tabs/mychannels');
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
    PopovercomponentPage.prototype.editPodcast = function (id) {
        var navData = {
            queryParams: {
                id: id,
                cid: this.channelid
            }
        };
        this.router.navigate(['tabs/editpodcast'], navData);
        this.DismissClick();
    };
    PopovercomponentPage.prototype.deletePodcast = function (id) {
        this.confirmDeletePodcast(id);
        this.DismissClick();
    };
    PopovercomponentPage.prototype.confirmDeletePodcast = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Confirm!',
                            message: '<strong>You are about to delete this podcast. This action is irreversible.</strong>!!!',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'OK',
                                    handler: function () {
                                        _this.deletePodcastConfirmed(id);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopovercomponentPage.prototype.deletePodcastConfirmed = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var param, loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            id: id
                        };
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please wait...'
                            })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.server.deletePodcast(param).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.presentToast("Podcast deleted Successfully");
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
    PopovercomponentPage.prototype.DismissClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popover.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopovercomponentPage.prototype.presentToast = function (txt) {
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
    __decorate([
        core_1.Input("popupkey1")
    ], PopovercomponentPage.prototype, "popupkey1");
    __decorate([
        core_1.Input("popupkey2")
    ], PopovercomponentPage.prototype, "popupkey2");
    __decorate([
        core_1.Input("channelid")
    ], PopovercomponentPage.prototype, "channelid");
    PopovercomponentPage = __decorate([
        core_1.Component({
            selector: 'app-popovercomponent',
            templateUrl: './popovercomponent.page.html',
            styleUrls: ['./popovercomponent.page.scss']
        })
    ], PopovercomponentPage);
    return PopovercomponentPage;
}());
exports.PopovercomponentPage = PopovercomponentPage;
