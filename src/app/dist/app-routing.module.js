"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var routes = [
    {
        path: 'tabs',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./tabs/tabs.module'); }).then(function (m) { return m.TabsPageModule; }); }
    },
    {
        path: '',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./login/login.module'); }).then(function (m) { return m.LoginPageModule; }); }
    },
    {
        path: 'register',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./register/register.module'); }).then(function (m) { return m.RegisterPageModule; }); }
    },
    {
        path: 'login',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./login/login.module'); }).then(function (m) { return m.LoginPageModule; }); }
    },
    {
        path: 'tab4',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./tab4/tab4.module'); }).then(function (m) { return m.Tab4PageModule; }); }
    },
    {
        path: 'tab5',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./tab5/tab5.module'); }).then(function (m) { return m.Tab5PageModule; }); }
    },
    {
        path: 'forgot',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./forgot/forgot.module'); }).then(function (m) { return m.ForgotPageModule; }); }
    },
    // {
    //   path: 'myaccount',
    //   loadChildren: () => import('./myaccount/myaccount.module').then( m => m.MyaccountPageModule)
    // },
    {
        path: 'mychannels',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./mychannels/mychannels.module'); }).then(function (m) { return m.MychannelsPageModule; }); }
    },
    {
        path: 'mysubscriptions',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./mysubscriptions/mysubscriptions.module'); }).then(function (m) { return m.MysubscriptionsPageModule; }); }
    },
    {
        path: 'createchannels',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./createchannels/createchannels.module'); }).then(function (m) { return m.CreatechannelsPageModule; }); }
    },
    {
        path: 'accountsettings',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./accountsettings/accountsettings.module'); }).then(function (m) { return m.AccountsettingsPageModule; }); }
    },
    {
        path: 'popovercomponent',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./popovercomponent/popovercomponent.module'); }).then(function (m) { return m.PopovercomponentPageModule; }); }
    },
    {
        path: 'channel',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./channel/channel.module'); }).then(function (m) { return m.ChannelPageModule; }); }
    },
    {
        path: 'changepassword',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./changepassword/changepassword.module'); }).then(function (m) { return m.ChangepasswordPageModule; }); }
    },
    {
        path: 'podcast',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./podcast/podcast.module'); }).then(function (m) { return m.PodcastPageModule; }); }
    },
    {
        path: 'editchannel',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./editchannel/editchannel.module'); }).then(function (m) { return m.EditchannelPageModule; }); }
    },
    {
        path: 'editpodcast',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./editpodcast/editpodcast.module'); }).then(function (m) { return m.EditpodcastPageModule; }); }
    },
    {
        path: 'search',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./search/search.module'); }).then(function (m) { return m.SearchPageModule; }); }
    },
    {
        path: 'filter',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./filter/filter.module'); }).then(function (m) { return m.FilterPageModule; }); }
    },
    {
        path: 'livestream',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./livestream/livestream.module'); }).then(function (m) { return m.LivestreamPageModule; }); }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
