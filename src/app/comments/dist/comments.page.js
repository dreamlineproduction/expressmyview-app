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
exports.CommentsPage = void 0;
var core_1 = require("@angular/core");
var CommentsPage = /** @class */ (function () {
    function CommentsPage(modalController, navCtrl, server, toastController, loadingController, alertController) {
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
        this.allComments = [];
        this.subComment = false;
        this.allReplies = [];
        this.moreData = false;
        this.moreReply = false;
    }
    CommentsPage.prototype.ngOnInit = function () {
    };
    CommentsPage.prototype.ionViewDidEnter = function () {
        this.getAllComments();
    };
    CommentsPage.prototype.closeModel = function () {
        this.modalController.dismiss();
    };
    CommentsPage.prototype.subComments = function (cid) {
        this.server.subComments(this.uid, cid, this.pid);
        this.modalController.dismiss();
    };
    CommentsPage.prototype.uploadComment = function () {
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
                            uid: this.uid
                        };
                        this.server.uploadComment(params).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                var data = {
                                    "id": response.message.id,
                                    "podcast_id": _this.pid,
                                    "user_id": _this.uid,
                                    "parent_id": 0,
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
                                console.log("this comments", _this.allComments);
                                // if(this.allComments){
                                //   this.allComments.unshift(data);
                                // }else{
                                //   this.allComments = data;
                                // }
                                _this.allComments.unshift(data);
                                _this.count++;
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
    CommentsPage.prototype.likeComment = function (comment) {
        return __awaiter(this, void 0, void 0, function () {
            var loading_1, params;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!comment.isSame) return [3 /*break*/, 1];
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
                            cid: comment.id,
                            uid: this.uid
                        };
                        this.server.likeComment(params).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.presentToast(response.message);
                                _this.likes = response.likes;
                                if (comment.isLiked == true) {
                                    comment.likes--;
                                    comment.isLiked = false;
                                }
                                else {
                                    comment.likes++;
                                    comment.isLiked = true;
                                }
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
    CommentsPage.prototype["delete"] = function (cid, myIndex, type) {
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
                                        _this.deleteComment(cid, myIndex, type);
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
    CommentsPage.prototype.deleteComment = function (cid, index, type) {
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
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.presentToast(response.message);
                                if (type == 'subComment') {
                                    console.log("inside subComment");
                                    if (index != "main") {
                                        _this.allReplies.splice(index, 1);
                                    }
                                    else {
                                        _this.allReplies = [];
                                        _this.getAllComments();
                                        _this.commentBox = [];
                                        _this.cid = "";
                                        _this.subComment = false;
                                    }
                                }
                                else {
                                    _this.allComments.splice(index, 1);
                                }
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
    CommentsPage.prototype.getAllComments = function () {
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
                        this.server.getAllCommentsByPodcastId(params).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                // this.allComments = null;
                                _this.allComments = response.message.data;
                                _this.count = response.count;
                                _this.likes = response.message.data.likes;
                                _this.nextPageURL = response.message.next_page_url;
                                if (_this.nextPageURL != null) {
                                    _this.moreData = true;
                                }
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
    CommentsPage.prototype.presentToast = function (txt) {
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
    CommentsPage.prototype.getAllSubComments = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            var loading, params;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cid = cid;
                        return [4 /*yield*/, this.loadingController.create({
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
                        this.server.getAllReplyByCommentId(params).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.comment = response.comment;
                                _this.allReplies = response.replies.data;
                                _this.nextReplyPageURL = response.replies.next_page_url;
                                if (_this.nextReplyPageURL != null) {
                                    _this.moreReply = true;
                                }
                                _this.loaded = true;
                                _this.commentBox = [];
                                _this.subComment = true;
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
    CommentsPage.prototype.uploadReply = function () {
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
    CommentsPage.prototype.goBack = function () {
        this.getAllComments();
        this.commentBox = [];
        this.cid = "";
        this.subComment = false;
    };
    CommentsPage.prototype.doInfinite = function (event) {
        var _this = this;
        console.log("nextPage", this.nextPageURL);
        this.server.loadMorePost(this.nextPageURL + "&uid=" + this.uid + "&pid=" + this.pid).subscribe(function (response) {
            console.log("reponse more", response);
            response.message.data.forEach(function (element) {
                _this.allComments.push(element);
            });
            _this.nextPageURL = response.message.next_page_url;
            event.target.complete();
            console.log("nextPagei", _this.nextPageURL);
            if (_this.nextPageURL == null) {
                _this.moreData = false;
            }
        });
    };
    CommentsPage.prototype.loadMoreReply = function (event) {
        var _this = this;
        console.log("nextPage", this.nextReplyPageURL);
        this.server.loadMorePost(this.nextReplyPageURL + "&uid=" + this.uid + "&cid=" + this.cid).subscribe(function (response) {
            console.log("reponse more", response);
            response.replies.data.forEach(function (element) {
                _this.allReplies.push(element);
            });
            _this.nextReplyPageURL = response.replies.next_page_url;
            event.target.complete();
            console.log("nextPagei", _this.nextReplyPageURL);
            if (_this.nextReplyPageURL == null) {
                _this.moreReply = false;
            }
        });
    };
    __decorate([
        core_1.Input("pid")
    ], CommentsPage.prototype, "pid");
    __decorate([
        core_1.Input("uid")
    ], CommentsPage.prototype, "uid");
    CommentsPage = __decorate([
        core_1.Component({
            selector: 'app-comments',
            templateUrl: './comments.page.html',
            styleUrls: ['./comments.page.scss']
        })
    ], CommentsPage);
    return CommentsPage;
}());
exports.CommentsPage = CommentsPage;
