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
exports.Tab3Page = void 0;
var core_1 = require("@angular/core");
// import { Media, MediaObject } from '@ionic-native/media';
var ngx_1 = require("@ionic-native/file-transfer/ngx");
var core_2 = require("@angular/core");
var Tab3Page = /** @class */ (function () {
    function Tab3Page(location, navCtrl, server, toastController, loadingController, camera, actionSheetController, file, transfer, filepath, filechooser, zone, videoEditor) {
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
        this.title = 'angular-text-search-highlight';
        this.searchText = '';
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
        this.user_image = 'assets/icon/default_user.png';
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
        this.items = [
            { display: 'Pizza', value: 1 },
            { display: 'Pasta', value: 2 },
            { display: 'Parmesan', value: 3 },
        ];
        this.uploadText = "";
        this.downloadText = "";
        this.languages = [];
        this.uid = localStorage.getItem('user_id');
        this.getDatas();
    }
    Tab3Page.prototype.ngOnInit = function () {
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
    };
    Tab3Page.prototype.uploadFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userid;
            var _this = this;
            return __generator(this, function (_a) {
                userid = localStorage.getItem('user_id');
                console.log("userid", userid);
                this.filechooser.open().then(function (uri) {
                    _this.fileURI = uri;
                    _this.filepath.resolveNativePath(uri).then(function (nativepath) {
                        _this.filesName = nativepath.substring(nativepath.lastIndexOf('/') + 1);
                        _this.fileExtension = _this.filesName.substring(_this.filesName.lastIndexOf(".") + 1);
                        if (_this.fileExtension == "mp4") {
                            _this.fileType = "video";
                            _this.getvideoinfo(uri);
                        }
                        else if (_this.fileExtension == "mp3") {
                            _this.fileType = "audio";
                            // let duration = this.fileURI.getDuration();
                            // console.log(duration);
                            // this.getaudioinfo(uri);
                            _this.duration = 0;
                        }
                        if (_this.fileExtension == "mp4" || _this.fileExtension == "mp3") {
                            console.log("file extension", _this.fileExtension);
                            console.log("filename", _this.filesName);
                            _this.fileTransfer = _this.transfer.create();
                            var options = {
                                fileKey: 'mediafile',
                                fileName: _this.filesName,
                                chunkedMode: false,
                                headers: {},
                                mimeType: 'video/mp4'
                            };
                            var params = {
                                'userid': userid,
                                'filetype': _this.fileType,
                                "runtime": _this.duration,
                                "fileName": "this.filesName",
                                "size": _this.size
                            };
                            options.params = params;
                            var ft = new ngx_1.FileTransfer();
                            var progressValue = 0;
                            _this.fileTransfer.onProgress(function (progressEvent) {
                                _this.videoUpload = true;
                                console.log(progressEvent);
                                console.log("lenght progress", progressEvent.lengthComputable);
                                if (progressEvent.lengthComputable) {
                                    _this.zone.run(function () {
                                        var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                                        _this.uploadText = perc + "% loaded...";
                                        _this.uploadProgress = perc;
                                    });
                                }
                                else {
                                    if (_this.uploadText == "") {
                                        _this.uploadText = "Loading";
                                    }
                                    else {
                                        _this.uploadText += ".";
                                    }
                                }
                            });
                            console.log("data", _this.duration, _this.size);
                            _this.fileTransfer.upload(nativepath, 'https://testmyserver.in/expressmyviewserver/api/uploadMedia', options).then(function (data) {
                                console.log("transfer done =" + JSON.stringify(data));
                                console.log("transfer done 1 =" + data);
                                _this.uploadProgress = 100;
                            }, function (err) {
                                _this.uploadText = "";
                                console.log(JSON.stringify(err));
                            });
                        }
                        else {
                            alert("Unsupported Format, Supported Audio format is mp3 and supported video format is mp4");
                        }
                    }, function (err) {
                        console.log(JSON.stringify(err));
                    });
                }, function (err) {
                    console.log(JSON.stringify(err));
                });
                return [2 /*return*/];
            });
        });
    };
    Tab3Page.prototype.getvideoinfo = function (fileUri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.videoEditor.getVideoInfo({ fileUri: fileUri }).then(function (videoInfo) {
                            _this.size = videoInfo.size;
                            _this.duration = videoInfo.duration;
                            console.log("data1", _this.duration, _this.size);
                            // this.mediaduration = videoInfo.duration;
                        })["catch"](function (error) {
                            alert(error);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab3Page.prototype.getaudioinfo = function (fileUri) {
        var audioFileDuration = fileUri.getDuration();
        alert(audioFileDuration);
    };
    Tab3Page.prototype.abortUpload = function () {
        this.fileTransfer.abort();
        console.log("upload Cancel");
    };
    Tab3Page.prototype.selectMember = function (event, checkbox) {
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
    Tab3Page.prototype.removeCheckedFromArray = function (checkbox) {
        return this.selectedCategories.findIndex(function (category) {
            return category === checkbox;
        });
    };
    Tab3Page.prototype.transform = function (items, searchText) {
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
    Tab3Page.prototype.onSearchChange = function (event) {
        console.log("event search", event);
    };
    Tab3Page.prototype.addLanguage = function (e) {
        console.log("event search", e.target.innerHTML);
        var addIndex = this.languages.indexOf(e.target.innerHTML);
        if (addIndex == -1) {
            this.languages.push(e.target.innerHTML);
        }
        // this.allLanguageInDetails.forEach(allLanguage => {
        //   if(allLanguage.name == e.target.innerHTML){
        //     this.allLanguagesIds.push(allLanguage.id);
        //     console.log("selected languages", this.allLanguagesIds);
        //   }
        // });
        console.log("added languages", this.languages);
        var index = this.allLanguages.indexOf(e.target.innerHTML);
        if (index !== -1) {
            this.allLanguages.splice(index, 1);
        }
        this.searchText = "";
    };
    Tab3Page.prototype.removeLanguage = function (e) {
        console.log("event close", e);
        var index = this.languages.indexOf(e);
        if (index !== -1) {
            this.languages.splice(index, 1);
        }
        console.log("removed languages", this.languages);
        this.allLanguages.push(e);
        // this.allLanguageInDetails.forEach(allLanguage => {
        //   if(allLanguage.name == e){
        //     const ids: number = this.allLanguagesIds.indexOf(allLanguage.id);
        //     if (ids !== -1) {
        //       this.allLanguagesIds.splice(ids, 1);
        //       console.log("removed languages", this.allLanguagesIds);
        //     }
        //   }
        // });
    };
    Tab3Page.prototype.addCast = function (e) {
        console.log("event search", e.target.innerHTML);
        var addIndex = this.casts.indexOf(e.target.innerHTML);
        if (addIndex == -1) {
            this.casts.push(e.target.innerHTML);
        }
        // this.allCastsInDetails.forEach(allCast => {
        //   if(allCast.name == e.target.innerHTML){
        //     this.allCastsIds.push(allCast.id);
        //     console.log("selected languages", this.allCastsIds);
        //   }
        // });
        console.log("added casts", this.casts);
        var index = this.allCasts.indexOf(e.target.innerHTML);
        if (index !== -1) {
            this.allCasts.splice(index, 1);
        }
        this.searchTextCasts = "";
    };
    Tab3Page.prototype.removeCast = function (e) {
        console.log("event close", e);
        var index = this.casts.indexOf(e);
        if (index !== -1) {
            this.casts.splice(index, 1);
        }
        console.log("removed casts", this.casts);
        this.allCasts.push(e);
        // this.allCastsInDetails.forEach(allCast => {
        //   if(allCast.name == e){
        //     const ids: number = this.allCastsIds.indexOf(allCast.id);
        //     if (ids !== -1) {
        //       this.allCastsIds.splice(ids, 1);
        //       console.log("removed languages", this.allCastsIds);
        //     }
        //   }
        // });
    };
    Tab3Page.prototype.addTag = function (e) {
        console.log("event search", e.target.innerHTML);
        var addIndex = this.tags.indexOf(e.target.innerHTML);
        if (addIndex == -1) {
            this.tags.push(e.target.innerHTML);
        }
        console.log("added tags", this.tags);
        // this.allCastsInDetails.forEach(allCast => {
        //   if(allCast.name == e.target.innerHTML){
        //     this.allCastsIds.push(allCast.id);
        //     console.log("selected languages", this.allCastsIds);
        //   }
        // });
        var index = this.allTags.indexOf(e.target.innerHTML);
        if (index !== -1) {
            this.allTags.splice(index, 1);
        }
        this.searchTextTags = "";
    };
    Tab3Page.prototype.removeTag = function (e) {
        console.log("event close", e);
        var index = this.tags.indexOf(e);
        if (index !== -1) {
            this.tags.splice(index, 1);
        }
        this.allTags.push(e);
        console.log("removed tags", this.tags);
        // this.allCastsInDetails.forEach(allCast => {
        //   if(allCast.name == e){
        //     const ids: number = this.allCastsIds.indexOf(allCast.id);
        //     if (ids !== -1) {
        //       this.allCastsIds.splice(ids, 1);
        //       console.log("removed languages", this.allCastsIds);
        //     }
        //   }
        // });
    };
    Tab3Page.prototype.pickImage = function (sourceType) {
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
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    Tab3Page.prototype.selectImage = function () {
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
    Tab3Page.prototype.save = function () {
        console.log("saved data", this.podcast);
    };
    Tab3Page.prototype.uploadVideo = function () {
    };
    Tab3Page.prototype.goBack = function () {
        this.location.back();
    };
    Tab3Page.prototype.getDatas = function () {
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
                            console.log("channels", response.channels);
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
                                _this.loaded = true;
                                loading.dismiss();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab3Page.prototype.presentToast = function (txt) {
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
    Tab3Page = __decorate([
        core_1.Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        }),
        core_2.Pipe({ name: 'appFilter' })
    ], Tab3Page);
    return Tab3Page;
}());
exports.Tab3Page = Tab3Page;
