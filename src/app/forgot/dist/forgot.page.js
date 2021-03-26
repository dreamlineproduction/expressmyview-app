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
exports.ForgotPage = void 0;
var core_1 = require("@angular/core");
var ForgotPage = /** @class */ (function () {
    function ForgotPage(navCtrl, server, toastController, loadingController) {
        this.navCtrl = navCtrl;
        this.server = server;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.logo = 'assets/icon/logo.svg';
        this.verifycode = false;
        this.otpverified = false;
        this.id = localStorage.getItem('user_id');
    }
    ForgotPage.prototype.ngOnInit = function () {
    };
    ForgotPage.prototype.login = function () {
        this.navCtrl.navigateForward('login');
    };
    ForgotPage.prototype.onSubmitClick = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var emailfilter, loading_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
                        if (!emailfilter.test(this.email)) {
                            this.presentToast("Please enter valid email");
                            return [2 /*return*/, false];
                        }
                        if (!(this.email == undefined || this.email == "")) return [3 /*break*/, 1];
                        this.presentToast("Please enter all details");
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...'
                        })];
                    case 2:
                        loading_1 = _a.sent();
                        return [4 /*yield*/, loading_1.present()];
                    case 3:
                        _a.sent();
                        this.server.forgotPassword(data).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.verifycode = true;
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
    ForgotPage.prototype.onVerify = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var loading_2, param;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.verificationcode == undefined || this.verificationcode == "")) return [3 /*break*/, 1];
                        this.presentToast("Please enter verification code");
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...'
                        })];
                    case 2:
                        loading_2 = _a.sent();
                        return [4 /*yield*/, loading_2.present()];
                    case 3:
                        _a.sent();
                        param = {
                            otp: data,
                            email: this.email
                        };
                        this.server.verifyCode(param).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.otpverified = true;
                                _this.verifycode = false;
                                loading_2.dismiss();
                            }
                            else {
                                _this.presentToast(response.error);
                                loading_2.dismiss();
                            }
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ForgotPage.prototype.changePasswordAfterVerified = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var loading_3, param;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.confirmpassword == undefined || this.password == undefined || this.password == '' || this.confirmpassword == '')) return [3 /*break*/, 1];
                        this.presentToast("Enter both fields");
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(this.password != this.confirmpassword)) return [3 /*break*/, 2];
                        this.presentToast("Password and confirmed password didn't match");
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(this.password.length < 6 || this.confirmpassword.length < 6)) return [3 /*break*/, 3];
                        this.presentToast("Password length should be minimum 6 characters");
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...'
                        })];
                    case 4:
                        loading_3 = _a.sent();
                        return [4 /*yield*/, loading_3.present()];
                    case 5:
                        _a.sent();
                        param = {
                            password: data,
                            email: this.email
                        };
                        this.server.changepasswordafterverified(param).subscribe(function (response) {
                            console.log("response", response);
                            if (response.error == undefined) {
                                _this.otpverified = false;
                                _this.verifycode = false;
                                _this.navCtrl.navigateForward('login');
                                loading_3.dismiss();
                            }
                            else {
                                _this.presentToast(response.error);
                                loading_3.dismiss();
                            }
                        });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ForgotPage.prototype.presentToast = function (txt) {
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
    ForgotPage = __decorate([
        core_1.Component({
            selector: 'app-forgot',
            templateUrl: './forgot.page.html',
            styleUrls: ['./forgot.page.scss']
        })
    ], ForgotPage);
    return ForgotPage;
}());
exports.ForgotPage = ForgotPage;
