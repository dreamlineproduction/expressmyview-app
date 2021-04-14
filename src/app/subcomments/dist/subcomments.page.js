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
exports.SubcommentsPage = void 0;
var core_1 = require("@angular/core");
var SubcommentsPage = /** @class */ (function () {
    function SubcommentsPage(modalController, navCtrl, server, toastController, loadingController, alertController) {
        this.modalController = modalController;
        this.navCtrl = navCtrl;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.loaded = false;
        this.user_image = 'assets/icon/default_user.png';
        this.close = 'assets/icon/close.png';
        this.back = 'assets/icon/back.svg';
        this.allReplies = [];
    }
    SubcommentsPage.prototype.ngOnInit = function () {
        this.getAllComments();
    };
    SubcommentsPage.prototype.closeModel = function () {
        for (var i = 0; i < this.server.modalInst.length; i++) {
            this.server.modalInst[i].dismiss();
        }
    };
    SubcommentsPage.prototype.likeComment = function (cid, isSame) {
        return __awaiter(this, void 0, void 0, function () {
            var loading_1, params;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isSame) return [3 /*break*/, 1];
                        this.presentToast("You can't like your own comment");
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...'
                        })];
                    case 2:
                        loading_1 = _a.sent();
                        return [4 /*yield*/, loading_1.present()];
                    case 3:
                        _a.sent();
                        params = {
                            cid: cid,
                            uid: this.uid
                        };
                        this.server.likeComment(params).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.presentToast(response.message);
                                _this.loaded = true;
                                loading_1.dismiss();
                            }
                            else {
                                _this.presentToast(response.error);
                                _this.loaded = true;
                                loading_1.dismiss();
                            }
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SubcommentsPage.prototype["delete"] = function (cid, myIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Confirm',
                            message: 'You are going to delete this comment, the process cannot be reverted back, please confirm to proceed.',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Confirm',
                                    handler: function () {
                                        _this.deleteComment(cid, myIndex);
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
    SubcommentsPage.prototype.deleteComment = function (cid, index) {
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
                            cid: cid,
                            uid: this.uid
                        };
                        this.server.deleteComment(params).subscribe(function (response) {
                            if (index != "main") {
                                _this.allReplies.splice(index, 1);
                            }
                            else {
                                _this.allReplies = [];
                                _this.modalController.dismiss();
                                _this.server.comments(_this.uid, _this.pid);
                            }
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.presentToast(response.message);
                                _this.loaded = true;
                                loading.dismiss();
                            }
                            else {
                                _this.presentToast(response.error);
                                _this.loaded = true;
                                loading.dismiss();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SubcommentsPage.prototype.getAllComments = function () {
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
                            cid: this.cid,
                            uid: this.uid
                        };
                        this.server.getAllReplyByCommentId(params).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.comment = response.comment;
                                _this.allReplies = response.replies.data;
                                _this.loaded = true;
                                loading.dismiss();
                            }
                            else {
                                _this.presentToast(response.error);
                                _this.loaded = true;
                                loading.dismiss();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SubcommentsPage.prototype.uploadComment = function () {
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
                            comment: this.commentBox,
                            uid: this.uid,
                            cid: this.cid
                        };
                        this.server.uploadReply(params).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                var data = {
                                    "id": response.message.id,
                                    "podcast_id": _this.pid,
                                    "user_id": _this.uid,
                                    "parent_id": _this.cid,
                                    "message": _this.commentBox,
                                    "likes": 0,
                                    "status": 1,
                                    "created_at": response.message.created_at,
                                    "updated_at": response.message.updated_at,
                                    "replyCount": 0,
                                    "date": response.message.date,
                                    "username": response.message.username,
                                    "user_image": response.message.user_image,
                                    "isSame": true
                                };
                                _this.allReplies.unshift(data);
                                _this.commentBox = "";
                                _this.loaded = true;
                                loading.dismiss();
                            }
                            else {
                                _this.presentToast(response.error);
                                _this.loaded = true;
                                loading.dismiss();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SubcommentsPage.prototype.presentToast = function (txt) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: txt,
                            duration: 3000,
                            position: 'bottom',
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
    SubcommentsPage.prototype.goBack = function () {
        this.server.comments(this.uid, this.pid);
        this.modalController.dismiss();
    };
    __decorate([
        core_1.Input("cid")
    ], SubcommentsPage.prototype, "cid");
    __decorate([
        core_1.Input("uid")
    ], SubcommentsPage.prototype, "uid");
    __decorate([
        core_1.Input("pid")
    ], SubcommentsPage.prototype, "pid");
    SubcommentsPage = __decorate([
        core_1.Component({
            selector: 'app-subcomments',
            templateUrl: './subcomments.page.html',
            styleUrls: ['./subcomments.page.scss']
        })
    ], SubcommentsPage);
    return SubcommentsPage;
}());
exports.SubcommentsPage = SubcommentsPage;
