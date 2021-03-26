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
exports.LoginPage = void 0;
var core_1 = require("@angular/core");
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, server, toastController, loadingController) {
        this.navCtrl = navCtrl;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.logo = 'assets/icon/logo.svg';
        this.loaded = false;
        this.checkIfLoggedIn();
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.doLogin = function (data) {
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
                        this.server.login(data).subscribe(function (response) {
                            console.log("response login", response);
                            if (response.error == undefined) {
                                // if(this.rememberme){
                                //   localStorage.setItem('rememberme', "true");
                                //   localStorage.setItem('user_email', response[0][0].email);
                                //   localStorage.setItem('username', response[0][0].name);
                                //   localStorage.setItem('user_phone', response[1][0].phone);
                                //   localStorage.setItem('user_address', response[1][0].address);
                                // }
                                var createdVariable = 'id';
                                localStorage.setItem('user_id', response[0][0].id);
                                localStorage.setItem('rememberme', "true");
                                localStorage.setItem('user_email', response[0][0].email);
                                localStorage.setItem('username', response[0][0].name);
                                localStorage.setItem('user_phone', response[1][0].phone);
                                localStorage.setItem('user_address', response[1][0].address);
                                localStorage.setItem('user_image', response[1][0].imagePath);
                                _this.navCtrl.navigateForward('tabs');
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
    LoginPage.prototype.changeRemember = function (event) {
        this.rememberme = event;
    };
    LoginPage.prototype.presentToast = function (txt) {
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
    LoginPage.prototype.register = function () {
        this.navCtrl.navigateForward('register');
    };
    LoginPage.prototype.forgot = function () {
        this.navCtrl.navigateForward('forgot');
    };
    LoginPage.prototype.checkIfLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading, userid;
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
                        userid = localStorage.getItem('user_id');
                        console.log("userid", userid);
                        if (userid == '' || typeof userid === undefined || userid == null || userid == 'null') {
                            this.loaded = true;
                            loading.dismiss();
                        }
                        else {
                            this.navCtrl.navigateForward('tabs');
                            loading.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss']
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
