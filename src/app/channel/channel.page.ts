import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, ToastController, LoadingController} from '@ionic/angular';
import { PopovercomponentPage } from '../popovercomponent/popovercomponent.page'; 
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit {
  title:string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
  channel:string='assets/icon/channel.svg';
  logo:string='assets/icon/logo.svg';
  checkmark:string='assets/icon/checkmark.svg';
  threedots:string='assets/icon/threedots.svg';
  tiger:string='assets/icon/tiger.svg';
  user_image:any;
  cid:any;
  bannerPath = 'assets/icon/default_banner.jpeg';
  logoPath = 'assets/icon/default_user.png';
  channelDetails:any;
  allPodcastCount:any;
  allPodcasts:any;
  loaded:boolean = false;
  podcastLoaded:boolean = false;
  myData:boolean = false;
  uid:any;
  isSubscribed:boolean;
  isSame:boolean = false;
  nextPageURL:any;
  moreData:boolean = false;
  constructor(public popoverCtrl: PopoverController, private route: ActivatedRoute, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private router: Router) { 
    this.title = this.truncateChar(this.title);
    this.user_image = localStorage.getItem("user_image");
    this.uid = localStorage.getItem("user_id");
    this.route.queryParams.subscribe((data) => {
      if(data.myChannel){
        this.myData = true;
      }
      this.cid = data.id;
      this.getChannelDetails();
      this.getChannelPodcasts();
    });
  }

  ngOnInit() {
  }

  truncateChar(text: string): string {
    let charlimit = 35;
    if(!text || text.length <= charlimit )
    {
        return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + "...";
    return shortened;
  }

  // async presentPopover(ev: any) {
  //   const popover = await this.popoverCtrl.create({
  //     component: PopovercomponentPage,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }

  async getChannelDetails(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      'channel_id' : this.cid,
      "uid" : this.uid
    };

    this.server.channelDetails(params).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("datas", response[0]);
        this.channelDetails = response[0].channelDetails;
        this.allPodcastCount = response[0].allPodcastsCount;
        this.isSubscribed = response[0].isSubscribed;
        if(response[0].channelDetails.bannerPath){
          this.bannerPath = response[0].channelDetails.bannerPath;
        }
        if(response[0].channelDetails.logoPath){
          this.bannerPath = response[0].channelDetails.logoPath;
        }
        if(response[0].channelDetails.user_id == this.uid){
          this.isSame = true;
        }
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        loading.dismiss();
      }
    });
  }

  async getChannelPodcasts(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      'channel_id' : this.cid,
    };

    this.server.getChannelPodcasts(params).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("datas", response[0]);
        this.allPodcasts = response[0].data;
        this.nextPageURL = response[0].next_page_url;
        if(this.nextPageURL != null){
          this.moreData =  true;
        }
        this.podcastLoaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        loading.dismiss();
      }
    });
  }

  doInfinite(event:any){
    console.log("nextPage", this.nextPageURL);
    this.server.loadMorePost(this.nextPageURL+"&channel_id="+this.cid).subscribe((response: any) => {
      console.log("reponse more", response);
      response[0].data.forEach(element => {
        this.allPodcasts.push(element);
      });
      this.nextPageURL = response[0].next_page_url;
      event.target.complete()
      console.log("nextPagei", this.nextPageURL);
      if(this.nextPageURL == null){
        this.moreData = false;
      }
    });
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position: 'top',
      mode: 'ios',
      color: 'dark'
    });
    toast.present();
  }
 
  async presentPopover(ev,key1, key2) {
    if(key1 == "channel"){
      const popover = await this.popoverCtrl.create({
        component: PopovercomponentPage,
        event: ev,
        componentProps: {
          popupkey1: key1,
          popupkey2 : key2,
          channelid : this.cid
        },
        translucent: true
      })
      return await popover.present();
    }else{
      const popover = await this.popoverCtrl.create({
        component: PopovercomponentPage,
        event: ev,
        componentProps: {
          popupkey3: key1,
          popupkey4 : key2,
          channelid : this.cid
        },
        translucent: true
      })
      return await popover.present();
    }
  }

  async subscribe(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      id : this.cid,
      uid : this.uid
    };

    this.server.subscribeChannel(params).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("like response", response);

        if(response.action == "subscribed"){
          this.isSubscribed = true;
        }else{
          this.isSubscribed = false;
        }
        this.presentToast(response.msg);
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        loading.dismiss();
      }
    });
  }

  goToPlay(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['tabs/podcast'], navData);
  }
}
