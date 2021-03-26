import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      },{
        path: 'myaccount',
        loadChildren: () => import('../myaccount/myaccount.module').then( m => m.MyaccountPageModule)
      },
      {
        path: 'mychannels',
        loadChildren: () => import('../mychannels/mychannels.module').then( m => m.MychannelsPageModule)
      },
      {
        path: 'mysubscriptions',
        loadChildren: () => import('../mysubscriptions/mysubscriptions.module').then( m => m.MysubscriptionsPageModule)
      },
      {
        path: 'createchannels',
        loadChildren: () => import('../createchannels/createchannels.module').then( m => m.CreatechannelsPageModule)
      },
      {
        path: 'accountsettings',
        loadChildren: () => import('../accountsettings/accountsettings.module').then( m => m.AccountsettingsPageModule)
      },
      {
        path: 'popovercomponent',
        loadChildren: () => import('../popovercomponent/popovercomponent.module').then( m => m.PopovercomponentPageModule)
      },
      {
        path: 'channel',
        loadChildren: () => import('../channel/channel.module').then( m => m.ChannelPageModule)
      },
      {
        path: 'changepassword',
        loadChildren: () => import('../changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
      },
      {
        path: 'podcast',
        loadChildren: () => import('../podcast/podcast.module').then( m => m.PodcastPageModule)
      },
      {
        path: 'editchannel',
        loadChildren: () => import('../editchannel/editchannel.module').then( m => m.EditchannelPageModule)
      },
      {
        path: 'editpodcast',
        loadChildren: () => import('../editpodcast/editpodcast.module').then( m => m.EditpodcastPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'filter',
        loadChildren: () => import('../filter/filter.module').then( m => m.FilterPageModule)
      },
      {
        path: 'livestream',
        loadChildren: () => import('../livestream/livestream.module').then( m => m.LivestreamPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
