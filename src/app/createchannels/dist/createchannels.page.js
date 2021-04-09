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
exports.CreatechannelsPage = void 0;
var core_1 = require("@angular/core");
var CreatechannelsPage = /** @class */ (function () {
    function CreatechannelsPage(location, navCtrl, camera, actionSheetController, file, server, toastController, loadingController) {
        this.location = location;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.file = file;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.back = 'assets/icon/back.svg';
        this.logo_img = 'assets/icon/logo.svg';
        this.search = 'assets/icon/search.svg';
        this.user_image = 'assets/icon/default_user.png';
        this.uid = localStorage.getItem("user_id");
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
    }
    CreatechannelsPage.prototype.pickImage = function (sourceType, source) {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: sourceType,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.selectedImage = 'data:image/jpeg;base64,' + imageData;
            if (source == "logo") {
                _this.logo = _this.selectedImage;
            }
            else {
                _this.banner = _this.selectedImage;
            }
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    CreatechannelsPage.prototype.selectImage = function (source) {
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
                                        _this.pickImage(_this.camera.PictureSourceType.PHOTOLIBRARY, source);
                                    }
                                }, {
                                    text: "Use Camera",
                                    handler: function () {
                                        _this.pickImage(_this.camera.PictureSourceType.CAMERA, source);
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
    CreatechannelsPage.prototype.save = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var param, loading_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            name: this.name,
                            banner: this.banner,
                            logo: this.logo,
                            description: this.description,
                            facebook: this.facebook,
                            twitter: this.twitter,
                            youtube: this.youtube,
                            pinterest: this.pinterest,
                            instagram: this.instagram,
                            linkedin: this.linkedin,
                            tiktok: this.tiktok,
                            id: this.uid
                        };
                        console.log("data", param);
                        if (!(this.name == undefined || this.name == "" || typeof this.name === undefined)) return [3 /*break*/, 1];
                        this.presentToast("Name is mandatory");
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...'
                        })];
                    case 2:
                        loading_1 = _a.sent();
                        return [4 /*yield*/, loading_1.present()];
                    case 3:
                        _a.sent();
                        this.server.createChannel(param).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.presentToast("Channel Created Successfully");
                                _this.name = "";
                                _this.banner = "";
                                _this.logo = "";
                                _this.description = "";
                                _this.facebook = "";
                                _this.twitter = "";
                                _this.youtube = "";
                                _this.pinterest = "";
                                _this.instagram = "";
                                _this.linkedin = "";
                                _this.tiktok = "";
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
    CreatechannelsPage.prototype.presentToast = function (txt) {
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
    CreatechannelsPage.prototype.ngOnInit = function () {
        if (typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == "") {
        }
        else {
            this.user_image = localStorage.getItem("user_image");
        }
    };
    CreatechannelsPage.prototype.goBack = function () {
        this.location.back();
    };
    CreatechannelsPage = __decorate([
        core_1.Component({
            selector: 'app-createchannels',
            templateUrl: './createchannels.page.html',
            styleUrls: ['./createchannels.page.scss']
        })
    ], CreatechannelsPage);
    return CreatechannelsPage;
}());
exports.CreatechannelsPage = CreatechannelsPage;
