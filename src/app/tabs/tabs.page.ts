import { Component } from '@angular/core';

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

  clickedHomeIcon:string='assets/icon/clickedHomeIcon.svg';
  clickedListIcon:string='assets/icon/clickedListIcon.svg';
  clickedUploadIcon:string='assets/icon/clickedUploadIcon.svg';
  clickedPodcastIcon:string='assets/icon/clickedPodcastIcon.svg';
  clickedLiveIcon:string='assets/icon/clickedLiveIcon.svg';

  isHomeSelected = false;
  isListingSelected= false;
  isUploadSelected = false;
  isPodcastSelected= false;
  isLiveSelected = false;

  changeHomeIcon(): void {    
    this.resetAll();
    this.isHomeSelected = true;
  }


  changeListingIcon(): void {    
    this.resetAll();
    this.isListingSelected = true;
  }


  changeUploadIcon(): void {    
    this.resetAll();
    this.isUploadSelected = true;
  }


  changePodcastIcon(): void {    
    this.resetAll();
    this.isPodcastSelected = true;
  }


  changeLiveIcon(): void {    
    this.resetAll();
    this.isLiveSelected = true;
  }

  resetAll(){
    this.isHomeSelected = false;
    this.isListingSelected= false;
    this.isUploadSelected = false;
    this.isPodcastSelected= false;
    this.isLiveSelected = false;
  }

  constructor() {
    this.isHomeSelected = true;
  }

}
