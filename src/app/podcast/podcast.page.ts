import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.page.html',
  styleUrls: ['./podcast.page.scss'],
})
export class PodcastPage {
  @ViewChild('video') videoElement: ElementRef;
  logo:string='assets/icon/logo.svg';
  logout_icon:string='assets/icon/menu.svg';
  search:string='assets/icon/search.svg';
  user_image:any = 'assets/icon/default_user.png';
  tiger:string='assets/icon/tiger.svg';
  play:string='assets/icon/play.svg';
  checkmark:string='assets/icon/checkmark.svg';
  eye:string='assets/icon/eye.svg';
  calendar:string='assets/icon/calendar.svg';
  back:string='assets/icon/back.svg';
  pid:any;
  loaded:boolean = false;
  podcastDetails = [];
  channelName:any;
  casts:any;
  tags:any;
  categories:any;
  isSubscribed:boolean;
  isLiked:boolean;
  disliked:boolean;
  uid:any;
  relatedPodcasts = [];
  newrelatedPodcasts = [];
  isSame:boolean = false;
  fullHD:any;
  filetype:any;
  audio:any;

  constructor(private location: Location,  public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private streamingMedia: StreamingMedia, private route: ActivatedRoute,private router: Router,private nativeAudio: NativeAudio) { 
    this.route.queryParams.subscribe((data) => {
      this.pid = data.id;
    });
  
    this.uid = localStorage.getItem("user_id");
  }

  ionViewDidEnter(){
    this.loaded = false;
    this.uid = localStorage.getItem("user_id");
    this.loaded = false;
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
    this.getPodcastDetails();
  }

  ngOnInit(){
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
  }

  ngOnDestroy(){
  
  }

  // toFullScreen() {
  //   let elem = this.videoElement.nativeElement as HTMLVideoElement;
  //   // var elem = document.getElementById("video");
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   }
  // }

  goBack() {
    this.location.back();
  }

  // mediaPlay() {
  //   this.videoPlayer.play('http://expressmyview.crtvecode.in/uploads/0xxKzADjM0_undefined_1615285748.mp4').then(() => {
  //     console.log('video finished');
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }

  // mediaPlay(){
  //   let options: StreamingVideoOptions = {
  //     successCallback: () => { console.log('Video played') },
  //     errorCallback: (e) => { console.log('Error streaming') },
  //     orientation: 'potrait',
  //     shouldAutoClose: true,
  //     controls: true
  //   };
    
  //   this.streamingMedia.playVideo('http://expressmyview.crtvecode.in/uploads/0xxKzADjM0_undefined_1615285748.mp4', options);
  // }

  // audioPlay(){
  //   this.nativeAudio.preloadSimple('uniqueId1', 'path/to/file.mp3').then(() => {
  //     console.log('video finished');
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }
  
  async getPodcastDetails() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      id : this.pid,
      uid : this.uid
    };

    this.server.getPodcastDetails(params).subscribe((response: any) => {
      console.log("response", response[0]);
      if ( response.error == undefined) {
        this.relatedPodcasts = response[0].relatedPodcasts;
        this.podcastDetails = response[0].podcast;
        this.channelName = response[0].channelName;
        this.casts = response[0].casts;
        this.tags = response[0].tags;
        this.categories = response[0].categories;
        this.isSubscribed = response[0].isSubscribed;
        this.isLiked = response[0].isLiked;
        this.filetype = response[0].podcast.file_type;
        if(this.filetype == "video"){
          this.fullHD = response[0].podcast.videoPath; 
          // this.fullHD = 'https://expressmyview.crtvecode.in/public/uploads/KVljDAjLgn_null_1615291532.mp4';
        }else{
          this.audio = response[0].podcast.audioPath
        }
        if(response[0].podcast.user_id == this.uid){
          this.isSame = true;
        }
        // for(let i = 0; i < this.relatedPodcasts.length; i++){
        //   console.log(this.newrelatedPodcasts[i], "podcast");
        //   this.relatedPodcasts.push(this.newrelatedPodcasts[i]);
        // }
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        this.loaded = true;
        loading.dismiss();
      }
    });
  }

  ngAfterViewChecked(){
   
  }
  
  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position: 'bottom',
      mode: 'ios',
      color: 'dark'
    });
    toast.present();
  }

  async like(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      pid : this.pid,
      uid : this.uid
    };

    this.server.likePodcast(params).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("like response", response);

        if(response.action == "liked"){
          this.isLiked = true;
        }else{
          this.isLiked = false;
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

  async subscribe(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      pid : this.pid,
      uid : this.uid
    };

    this.server.subscribePodcast(params).subscribe((response: any) => {
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
    this.pid = id;
    this.getPodcastDetails();
  }

  comments(){
    this.server.comments(this.uid, this.pid);
  }
}
