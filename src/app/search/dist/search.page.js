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
exports.SearchPage = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var SearchPage = /** @class */ (function () {
    function SearchPage(modalController, httpBackend, server, toastController, http) {
        this.modalController = modalController;
        this.httpBackend = httpBackend;
        this.server = server;
        this.toastController = toastController;
        this.http = http;
        this.back = 'assets/icon/back.svg';
        this.filter = 'assets/icon/filter.png';
        this.http = new http_1.HttpClient(this.httpBackend);
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        this.options = {
            headers: headers
        };
    }
    SearchPage.prototype.ngOnInit = function () {
    };
    SearchPage.prototype.goBack = function () {
        this.modalController.dismiss();
    };
    SearchPage.prototype.filterSearch = function () {
        this.server.filterSearch();
    };
    SearchPage.prototype.searchKey = function (ev) {
        var _this = this;
        this.searchKeys = ev.target.value;
        var params = {
            q: this.searchKeys
        };
        this.server.searchAPI(params, this.options).subscribe(function (response) {
            if (response.error == undefined) {
                console.log("response", response);
            }
            else {
                _this.presentToast(response.error);
            }
        });
    };
    SearchPage.prototype.presentToast = function (txt) {
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
    SearchPage = __decorate([
        core_1.Component({
            selector: 'app-search',
            templateUrl: './search.page.html',
            styleUrls: ['./search.page.scss']
        })
    ], SearchPage);
    return SearchPage;
}());
exports.SearchPage = SearchPage;
