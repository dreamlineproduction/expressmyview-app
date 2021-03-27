import { Component, OnInit, ViewChild, ElementRef, Renderer2, RendererFactory2, } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-my-medias',
  templateUrl: './my-medias.page.html',
  styleUrls: ['./my-medias.page.scss'],
})
export class MyMediasPage{
  logo:string='assets/icon/logo.svg';
  menu:string='assets/icon/menu.svg';
  back:string='assets/icon/back.svg';
  search:string='assets/icon/search.svg';
  tiger:string='assets/icon/tiger.svg';
  checkmark:string='assets/icon/checkmark.svg';
  eye:string='assets/icon/eye.svg';
  user_image:any = 'assets/icon/default_user.png';
  calendar:string='assets/icon/calendar.svg';
  title:string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
  allVideoPodcasts:any;
  loaded:boolean = false;
  uid:any;
  media:any;
  pageTitle:any;
  constructor(private location: Location,  public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private streamingMedia: StreamingMedia, private route: ActivatedRoute,private router: Router) {
    this.title = this.truncateChar(this.title);
    this.route.queryParams.subscribe((data) => {
      this.uid = localStorage.getItem("user_id");
      this.media = data.media;
      if(data.media == "video"){
        this.pageTitle = "My Video Podcasts";
      }else{
        this.pageTitle = "My Audio Podcasts";
      }
    });
    this.getAllPodcasts();
  }

  truncateChar(text: string): string {
    let charlimit = 50;
    if(!text || text.length <= charlimit )
    {
        return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + "...";
    return shortened;
  }

  async getAllPodcasts(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      id : this.uid,
      media : this.media
    };

    this.server.getMyAllPodcasts(params).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("datas", response[0]);
        this.allVideoPodcasts = response[0].allVideoPodcasts;
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        this.loaded = true;
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

  goBack() {
    this.location.back();
  }

  goToPlay(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['tabs/podcast'], navData);
  }

  ngOnInit() {
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
  }

}