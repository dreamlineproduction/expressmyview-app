import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  home:string='assets/icon/home.svg';
  listing:string='assets/icon/listing.svg';
  upload:string='assets/icon/upload.svg';
  podcast:string='assets/icon/podcast.svg';
  live:string='assets/icon/live.svg';

  constructor(public navCtrl: NavController, private router: Router) {
  }

}
