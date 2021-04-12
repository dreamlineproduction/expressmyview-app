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
exports.ServiceService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var search_page_1 = require("../app/search/search.page");
var filter_page_1 = require("../app/filter/filter.page");
var comments_page_1 = require("../app/comments/comments.page");
var subcomments_page_1 = require("../app/subcomments/subcomments.page");
var ServiceService = /** @class */ (function () {
    // url = "https://testmyserver.in/expressmyviewserver/api/";
    // url = "https://expressmyview.com/api/"
    function ServiceService(http, httpBackend, navCtrl, modalController) {
        this.http = http;
        this.httpBackend = httpBackend;
        this.navCtrl = navCtrl;
        this.modalController = modalController;
        this.modalInst = [];
        this.i = 0;
        // url = "http://127.0.0.1:8000/api/";
        this.url = "https://expressmyview.crtvecode.in/expressmyview-git/expressmyview/public/api/";
        this.http = new http_1.HttpClient(this.httpBackend);
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.options = {
            headers: headers
        };
    }
    ServiceService.prototype.login = function (data) {
        return this.http.post(this.url + 'login', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.register = function (data) {
        return this.http.post(this.url + 'reg', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.checkIfLoggedIn = function () {
        var userid = localStorage.getItem('user_id');
        var useremail = localStorage.getItem('user_email');
        var username = localStorage.getItem('username');
        if (userid == '' || username == '' || useremail == '' || typeof userid === undefined || typeof username === undefined || typeof useremail === undefined) {
            this.navCtrl.navigateForward('login');
        }
        else {
            this.navCtrl.navigateForward('tabs');
        }
    };
    ServiceService.prototype.logout = function () {
        // localStorage.setItem('user_id', "");
        // localStorage.setItem('user_email', "");
        // localStorage.setItem('username', "");
        localStorage.clear();
        this.navCtrl.navigateForward('login');
    };
    ServiceService.prototype.uploadPodcast = function (data) {
        return this.http.post(this.url + 'login', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getChannel = function (data) {
        return this.http.post(this.url + 'channelsByUid', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getLanguage = function (data) {
        return this.http.post(this.url + 'allLanguages', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getUploadPodcastDetails = function (data) {
        return this.http.post(this.url + 'getUploadPodcastDetails', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getHomeDatas = function (data) {
        return this.http.post(this.url + 'getHomeDatas', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getAllVideoPodcasts = function () {
        return this.http.get(this.url + 'getAllVideoPodcasts')
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getMyAccountDatas = function (data) {
        return this.http.post(this.url + 'getMyAccountDatas', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getPodcastDetails = function (data) {
        return this.http.post(this.url + 'getPodcastDetails', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getMyChannels = function (data) {
        return this.http.post(this.url + 'getMyChannels', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.channelDetails = function (data) {
        return this.http.post(this.url + 'channelDetails', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getChannelPodcasts = function (data) {
        return this.http.post(this.url + 'getChannelPodcasts', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getuser = function (data) {
        return this.http.post(this.url + 'getuser', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.updateAccountSettings = function (data) {
        return this.http.post(this.url + 'updateAccountSettings', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.createChannel = function (data) {
        return this.http.post(this.url + 'createChannel', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.changePassword = function (data) {
        return this.http.post(this.url + 'changePassword', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.forgotPassword = function (data) {
        return this.http.post(this.url + 'forgotpassword', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.verifyCode = function (data) {
        return this.http.post(this.url + 'verifyotp', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.changepasswordafterverified = function (data) {
        return this.http.post(this.url + 'changepasswordafterverified', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.likePodcast = function (data) {
        return this.http.post(this.url + 'likePodcast', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.subscribePodcast = function (data) {
        return this.http.post(this.url + 'subscribePodcast', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.relatedPodcasts = function (data) {
        return this.http.post(this.url + 'relatedPodcasts', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.updateChannel = function (data) {
        return this.http.post(this.url + 'updateChannel', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.deleteChannel = function (data) {
        return this.http.post(this.url + 'deleteChannel', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.deletePodcast = function (data) {
        return this.http.post(this.url + 'deletePodcast', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.updatePodcastDetails = function (data) {
        return this.http.post(this.url + 'updatePodcastDetails', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getMySubscriptions = function (data) {
        return this.http.post(this.url + 'mySubscriptionsAPI', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getAllChannels = function (data) {
        return this.http.post(this.url + 'getAllChannels', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getLiveStreams = function (data) {
        return this.http.post(this.url + 'getLiveStreams', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.watchAPI = function (data) {
        return this.http.post(this.url + 'watchAPI', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.subscribeChannel = function (data) {
        return this.http.post(this.url + 'subscribeChannel', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.searchAPI = function (data, options) {
        return this.http.post(this.url + 'searchAPI', data, options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getMyAllPodcasts = function (data) {
        return this.http.post(this.url + 'getMyAllPodcasts', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getAllCommentsByPodcastId = function (data) {
        console.log("comment data in service", data);
        return this.http.post(this.url + 'getAllCommentsByPodcastId', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getAllReplyByCommentId = function (data) {
        console.log("comment data in service", data);
        return this.http.post(this.url + 'getAllReplyByCommentId', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.uploadComment = function (data) {
        console.log("comment data in service", data);
        return this.http.post(this.url + 'uploadComment', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.likeComment = function (data) {
        console.log("comment data in service", data);
        return this.http.post(this.url + 'likeComment', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.uploadReply = function (data) {
        console.log("comment data in service", data);
        return this.http.post(this.url + 'uploadReply', data, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.loadMore = function (url) {
        return this.http.get(url, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.loadMorePost = function (url) {
        return this.http.post(url, this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.getAllCategories = function () {
        return this.http.get(this.url + 'getAllCategories', this.options)
            .pipe(operators_1.map(function (results) { return results; }));
    };
    ServiceService.prototype.presentModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: search_page_1.SearchPage,
                            cssClass: 'my-custom-class'
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceService.prototype.comments = function (uid, pid) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: comments_page_1.CommentsPage,
                            cssClass: 'commentsModel',
                            componentProps: { uid: uid, pid: pid }
                        })];
                    case 1:
                        modal = _a.sent();
                        this.storeModal(modal);
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceService.prototype.subComments = function (uid, cid, pid) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: subcomments_page_1.SubcommentsPage,
                            cssClass: 'commentsModel',
                            componentProps: { uid: uid, cid: cid, pid: pid }
                        })];
                    case 1:
                        modal = _a.sent();
                        this.storeModal(modal);
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceService.prototype.filterSearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: filter_page_1.FilterPage,
                            cssClass: 'my-custom-class'
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceService.prototype.storeModal = function (x) {
        this.modalInst[this.i] = x;
        this.i++;
    };
    ServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ServiceService);
    return ServiceService;
}());
exports.ServiceService = ServiceService;
