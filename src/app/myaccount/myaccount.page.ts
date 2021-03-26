import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, ToastController, LoadingController} from '@ionic/angular';
import { PopovercomponentPage } from '../popovercomponent/popovercomponent.page'; 
import { Location } from '@angular/common';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {

  back:string='assets/icon/back.svg';
  logo:string='assets/icon/logo.svg';
  menu:string='assets/icon/menu.svg';
  search:string='assets/icon/search.svg';
  tiger:string='assets/icon/tiger.svg';
  checkmark:string='assets/icon/checkmark.svg';
  user_image:any;
  eye:string='assets/icon/eye.svg';
  calendar:string='assets/icon/calendar.svg';
  threedots:string='assets/icon/threedots.svg';
  title:string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
  uid:any;
  myVideos:any;
  myAudios:any;
  myChannels:any;
  myVideosLength:any;
  myAudiosLength:any;
  myChannelsLength:any;
  loaded:boolean = false;
  constructor(public popoverCtrl: PopoverController, private location: Location, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private router: Router) {
    this.title = this.truncateChar(this.title);
    this.uid = localStorage.getItem("user_id");
    this.user_image = localStorage.getItem("user_image");
    this.getMyAccountDatas();
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

  ngOnInit() {
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

  // slideOpts = {
  //   initialSlide: 1,
  //   speed: 400,
  //   on: {
  //     beforeInit() {
  //       const swiper = this;
  //       swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
  //       const overwriteParams = {
  //         slidesPerView: 3.5,
  //         autoplay:true,
  //         spaceBetween: -15,
  //         centeredSlides: false
  //       };
  //       swiper.params = Object.assign(swiper.params, overwriteParams);
  //       swiper.params = Object.assign(swiper.originalParams, overwriteParams);
  //     },
  //   }
  // };

  goBack() {
    this.location.back();
  }

  async getMyAccountDatas(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      'userid' : this.uid
    };

    this.server.getMyAccountDatas(params).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("datas", response[0]);
        this.myVideos = response[0].myVideos;
        this.myVideosLength = this.myVideos.length;
        this.myAudios = response[0].myAudios;
        this.myAudiosLength = this.myAudios.length;
        this.myChannels = response[0].myChannels;
        this.myChannelsLength = this.myChannels.length;
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        loading.dismiss();
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

  async presentPopover(ev, cid,key1, key2) {
    if(key1 == "channel"){
      const popover = await this.popoverCtrl.create({
        component: PopovercomponentPage,
        event: ev,
        componentProps: {
          popupkey1: key1,
          popupkey2 : key2,
          channelid : cid
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
          channelid : cid
        },
        translucent: true
      })
      return await popover.present();
    }
  }

  goToChannelDetails(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['tabs/channel'], navData);
  }
}
