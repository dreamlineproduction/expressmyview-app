import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  // {
  //   path: 'myaccount',
  //   loadChildren: () => import('./myaccount/myaccount.module').then( m => m.MyaccountPageModule)
  // },
  {
    path: 'mychannels',
    loadChildren: () => import('./mychannels/mychannels.module').then( m => m.MychannelsPageModule)
  },
  {
    path: 'mysubscriptions',
    loadChildren: () => import('./mysubscriptions/mysubscriptions.module').then( m => m.MysubscriptionsPageModule)
  },
  {
    path: 'createchannels',
    loadChildren: () => import('./createchannels/createchannels.module').then( m => m.CreatechannelsPageModule)
  },
  {
    path: 'accountsettings',
    loadChildren: () => import('./accountsettings/accountsettings.module').then( m => m.AccountsettingsPageModule)
  },
  {
    path: 'popovercomponent',
    loadChildren: () => import('./popovercomponent/popovercomponent.module').then( m => m.PopovercomponentPageModule)
  },
  {
    path: 'channel',
    loadChildren: () => import('./channel/channel.module').then( m => m.ChannelPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'podcast',
    loadChildren: () => import('./podcast/podcast.module').then( m => m.PodcastPageModule)
  },
  {
    path: 'editchannel',
    loadChildren: () => import('./editchannel/editchannel.module').then( m => m.EditchannelPageModule)
  },
  {
    path: 'editpodcast',
    loadChildren: () => import('./editpodcast/editpodcast.module').then( m => m.EditpodcastPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'livestream',
    loadChildren: () => import('./livestream/livestream.module').then( m => m.LivestreamPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
