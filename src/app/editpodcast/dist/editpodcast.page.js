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
exports.EditpodcastPage = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var EditpodcastPage = /** @class */ (function () {
    function EditpodcastPage(location, navCtrl, server, toastController, loadingController, camera, actionSheetController, file, transfer, filepath, filechooser, zone, videoEditor, route, router) {
        var _this = this;
        this.location = location;
        this.navCtrl = navCtrl;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.file = file;
        this.transfer = transfer;
        this.filepath = filepath;
        this.filechooser = filechooser;
        this.zone = zone;
        this.videoEditor = videoEditor;
        this.route = route;
        this.router = router;
        this.title = '';
        this.searchText = '';
        this.user_image = 'assets/icon/default_user.png';
        this.allLanguages = [];
        this.logo = 'assets/icon/logo.svg';
        this.menu = 'assets/icon/menu.svg';
        this.search = 'assets/icon/search.svg';
        this.back = 'assets/icon/back.svg';
        this.cloud = 'assets/icon/cloud.svg';
        this.cloudgray = 'assets/icon/cloudgray.svg';
        this.croppedImagePath = "";
        this.podcast = {};
        this.languages = [];
        this.uploadProgress = 0;
        this.videoUpload = false;
        this.fileType = "";
        this.filesName = "";
        this.fileExtension = "";
        this.casts = [];
        this.channels = [];
        this.categories = [];
        this.tags = [];
        this.licenses = [];
        this.imagePickerOptions = {
            maximumImagesCount: 1,
            quality: 50
        };
        this.allLanguagesIds = [];
        this.allCastsIds = [];
        this.allTagsIds = [];
        this.allLanguageInDetails = [];
        this.allTagsInDetails = [];
        this.allTags = [];
        this.allCastsInDetails = [];
        this.allCasts = [];
        this.searchTextCasts = "";
        this.searchTextTags = "";
        this.selectedCategories = [];
        this.selectedCategoriesCount = 0;
        this.isCheckboxDisabled = false;
        this.newSearch = "";
        this.loaded = false;
        this.podcastDetails = [];
        this.relatedPodcasts = [];
        this.newrelatedPodcasts = [];
        this.uploadText = "";
        this.downloadText = "";
        this.languages = [];
        this.route.queryParams.subscribe(function (data) {
            _this.pid = data.id;
            _this.cid = data.cid;
        });
        this.uid = localStorage.getItem('user_id');
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
        this.getDatas();
        this.getPodcastDetails();
    }
    EditpodcastPage.prototype.selectMember = function (event, checkbox) {
        if (event.target.checked) {
            this.selectedCategories.push(checkbox);
            this.selectedCategoriesCount++;
            console.log("added", this.selectedCategories, this.selectedCategoriesCount);
        }
        else {
            var index = this.removeCheckedFromArray(checkbox);
            this.selectedCategories.splice(index, 1);
            this.selectedCategoriesCount--;
            console.log("removed", this.selectedCategories, this.selectedCategoriesCount);
        }
        if (this.selectedCategoriesCount >= 6) {
            this.isCheckboxDisabled = true;
        }
        else {
            this.isCheckboxDisabled = false;
        }
    };
    EditpodcastPage.prototype.removeCheckedFromArray = function (checkbox) {
        return this.selectedCategories.findIndex(function (category) {
            return category === checkbox;
        });
    };
    EditpodcastPage.prototype.transform = function (items, searchText) {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();
        var oldSearch = this.newSearch;
        this.newSearch = searchText;
        var index = items.indexOf(oldSearch);
        if (index !== -1) {
            items.splice(index, 1);
        }
        items.push(this.newSearch);
        return items.filter(function (it) {
            return it.toLocaleLowerCase().includes(searchText);
        });
    };
    EditpodcastPage.prototype.onSearchChange = function (event) {
        console.log("event search", event);
    };
    EditpodcastPage.prototype.addLanguage = function (e) {
        console.log("event search", e.target.innerHTML);
        var addIndex = this.languages.indexOf(e.target.innerHTML);
        if (addIndex == -1) {
            this.languages.push(e.target.innerHTML);
        }
        console.log("added languages", this.languages);
        var index = this.allLanguages.indexOf(e.target.innerHTML);
        if (index !== -1) {
            this.allLanguages.splice(index, 1);
        }
        this.searchText = "";
    };
    EditpodcastPage.prototype.removeLanguage = function (e) {
        console.log("event close", e);
        var index = this.languages.indexOf(e);
        if (index !== -1) {
            this.languages.splice(index, 1);
        }
        console.log("removed languages", this.languages);
        this.allLanguages.push(e);
    };
    EditpodcastPage.prototype.addCast = function (e) {
        console.log("event search", e.target.innerHTML);
        var addIndex = this.casts.indexOf(e.target.innerHTML);
        if (addIndex == -1) {
            this.casts.push(e.target.innerHTML);
        }
        console.log("added casts", this.casts);
        var index = this.allCasts.indexOf(e.target.innerHTML);
        if (index !== -1) {
            this.allCasts.splice(index, 1);
        }
        this.searchTextCasts = "";
    };
    EditpodcastPage.prototype.removeCast = function (e) {
        console.log("event close", e);
        var index = this.casts.indexOf(e);
        if (index !== -1) {
            this.casts.splice(index, 1);
        }
        console.log("removed casts", this.casts);
        this.allCasts.push(e);
    };
    EditpodcastPage.prototype.addTag = function (e) {
        console.log("event search", e.target.innerHTML);
        var addIndex = this.tags.indexOf(e.target.innerHTML);
        if (addIndex == -1) {
            this.tags.push(e.target.innerHTML);
        }
        console.log("added tags", this.tags);
        var index = this.allTags.indexOf(e.target.innerHTML);
        if (index !== -1) {
            this.allTags.splice(index, 1);
        }
        this.searchTextTags = "";
    };
    EditpodcastPage.prototype.removeTag = function (e) {
        console.log("event close", e);
        var index = this.tags.indexOf(e);
        if (index !== -1) {
            this.tags.splice(index, 1);
        }
        this.allTags.push(e);
        console.log("removed tags", this.tags);
    };
    EditpodcastPage.prototype.pickImage = function (sourceType) {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: sourceType,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
            _this.myPhoto = _this.croppedImagePath;
        }, function (err) {
            _this.presentToast(err);
        });
    };
    EditpodcastPage.prototype.selectImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: "Select Image Source",
                            buttons: [{
                                    text: "Load from Library",
                                    handler: function () {
                                        _this.pickImage(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                    }
                                }, {
                                    text: "Use Camera",
                                    handler: function () {
                                        _this.pickImage(_this.camera.PictureSourceType.CAMERA);
                                    }
                                }, {
                                    text: 'Cancel',
                                    role: 'cancel'
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditpodcastPage.prototype.save = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var param, loading_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.privacy_settings == "private") {
                            this.privacy = "0";
                        }
                        else {
                            this.privacy = "1";
                        }
                        param = {
                            id: this.pid,
                            channel: this.channel,
                            title: this.title,
                            privacy: this.privacy,
                            description: this.description,
                            languages: this.languages,
                            categories: this.selectedCategories,
                            thumbnail: this.myPhoto,
                            license: this.license,
                            tags: this.tags,
                            casts: this.casts
                        };
                        console.log("data", param);
                        if (!(this.title == undefined || this.title == "" || typeof this.title === undefined)) return [3 /*break*/, 1];
                        this.presentToast("Title is mandatory");
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...'
                        })];
                    case 2:
                        loading_1 = _a.sent();
                        return [4 /*yield*/, loading_1.present()];
                    case 3:
                        _a.sent();
                        this.server.updatePodcastDetails(param).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.presentToast("Podcast Updated Successfully");
                                loading_1.dismiss();
                            }
                            else {
                                _this.presentToast(response.error);
                                loading_1.dismiss();
                            }
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EditpodcastPage.prototype.goBack = function () {
        var navData = {
            queryParams: {
                id: this.cid
            }
        };
        this.router.navigate(['tabs/channel'], navData);
    };
    EditpodcastPage.prototype.getDatas = function () {
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
                        this.server.getUploadPodcastDetails(params).subscribe(function (response) {
                            console.log("channels", response);
                            console.log("channels", response);
                            if (response.channels.error) {
                                _this.presentToast(response.channels.error);
                                loading.dismiss();
                            }
                            else {
                                _this.allCastsInDetails = response.casts;
                                response.casts.forEach(function (cast) {
                                    _this.allCasts.push(cast.name);
                                });
                                _this.channels = response.channels;
                                _this.categories = response.categories;
                                _this.allTagsInDetails = response.tags;
                                response.tags.forEach(function (tag) {
                                    _this.allTags.push(tag.name);
                                });
                                _this.licenses = response.licenses;
                                _this.allLanguageInDetails = response.languages;
                                response.languages.forEach(function (language) {
                                    _this.allLanguages.push(language.name);
                                });
                                loading.dismiss();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    EditpodcastPage.prototype.getPodcastDetails = function () {
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
                            console.log("response1", response[0]);
                            if (response.error == undefined) {
                                _this.relatedPodcasts = response[0].relatedPodcasts;
                                _this.podcastDetails = response[0].podcast;
                                _this.channelName = response[0].channelName;
                                _this.casts = response[0].casts;
                                _this.tags = response[0].tags;
                                _this.languages = response[0].languages;
                                _this.categories.forEach(function (element) {
                                    response[0].categories.forEach(function (responseElement) {
                                        if (element.name == responseElement) {
                                            element.checked = true;
                                            _this.selectedCategories.push(element.name);
                                            _this.selectedCategoriesCount++;
                                        }
                                        if (_this.selectedCategoriesCount >= 6) {
                                            _this.isCheckboxDisabled = true;
                                        }
                                        else {
                                            _this.isCheckboxDisabled = false;
                                        }
                                    });
                                });
                                _this.isSubscribed = response[0].isSubscribed;
                                _this.isLiked = response[0].isLiked;
                                _this.description = response[0].podcast.description;
                                _this.title = response[0].podcast.title;
                                _this.license = response[0].podcast.license_id;
                                _this.channel = response[0].podcast.channel_id;
                                _this.myPhoto = response[0].podcast.thumbnail;
                                // this.title = response[0].podcast.description;
                                if (response[0].podcast.privacy == "0") {
                                    _this.privacy_settings = "private";
                                }
                                else {
                                    _this.privacy_settings = "public";
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
    EditpodcastPage.prototype.presentToast = function (txt) {
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
    EditpodcastPage = __decorate([
        core_1.Component({
            selector: 'app-editpodcast',
            templateUrl: './editpodcast.page.html',
            styleUrls: ['./editpodcast.page.scss']
        }),
        core_2.Pipe({ name: 'appFilter' })
    ], EditpodcastPage);
    return EditpodcastPage;
}());
exports.EditpodcastPage = EditpodcastPage;
