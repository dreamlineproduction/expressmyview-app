import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController} from '@ionic/angular';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  logo:string='assets/icon/logo.svg';
  logout_icon:string='assets/icon/menu.svg';
  search:string='assets/icon/search.svg';
  tiger:string='assets/icon/tiger.svg';
  checkmark:string='assets/icon/checkmark.svg';
  eye:string='assets/icon/eye.svg';
  calendar:string='assets/icon/calendar.svg';
  user_image:any;
  popularChannels:any;
  latestVideoPodcasts:any;
  streamingNows:any;
  uid:any;
  loaded:boolean = false;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 3.5,
          autoplay:true,
          spaceBetween: -15,
          centeredSlides: false
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
    }
  };
  
  constructor(public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private router: Router) {
    this.uid = localStorage.getItem("user_id");
    this.user_image = localStorage.getItem("user_image");
    this.getHomeDatas();
  }

  async getHomeDatas(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      'id' : this.uid
    };

    this.server.getHomeDatas(params).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("datas", response[0]);
        this.latestVideoPodcasts = response[0].latestVideoPodcasts;
        this.popularChannels = response[0].popularChannels;
        this.streamingNows = response[0].liveStreams;
        if(response[0].appID){
          localStorage.setItem("appID",response[0].appID );
        }
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        if(response[0].appID){
          localStorage.setItem("appID",response[0].appID );
        }
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

  goToChannelDetails(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['tabs/channel'], navData);
  }

  goToPlay(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['tabs/podcast'], navData);
  }

  searchPage(){
    this.server.presentModal();
  }
}
