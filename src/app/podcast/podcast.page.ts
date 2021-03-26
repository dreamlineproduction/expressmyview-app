import { Component, OnInit, ViewChild, ElementRef, Renderer2, RendererFactory2, } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import fluidPlayer from "fluid-player";

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.page.html',
  styleUrls: ['./podcast.page.scss'],
})
export class PodcastPage {
  private renderer: Renderer2;
  @ViewChild('video') videoElement: ElementRef;
  fluidPlayer: any;
  logo:string='assets/icon/logo.svg';
  logout_icon:string='assets/icon/menu.svg';
  search:string='assets/icon/search.svg';
  user_image:any;
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
  constructor(private location: Location,  public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private streamingMedia: StreamingMedia, private route: ActivatedRoute,private router: Router, private rendererFactory: RendererFactory2) { 
    this.route.queryParams.subscribe((data) => {
      this.pid = data.id;
    });
  
    this.uid = localStorage.getItem("user_id");
    this.user_image = localStorage.getItem("user_image");
    this.getPodcastDetails();
  }

  ngOnInit() {
  }

  // ngAfterViewInit(): void {
  //   const video = this.videoElement.nativeElement;
  //   this.fluidPlayers = fluidPlayer(video, {
  //     layoutControls: {
  //       playButtonShowing: false,
  //       autoPlay: true,
  //       keyboardControl: false,
  //       controlBar: false,
  //       fillToContainer: false,
  //     }
  //   });
  // }
  
  ngAfterViewInit(): void {
    const video = this.videoElement.nativeElement;
    this.fluidPlayer = fluidPlayer(video, {
      layoutControls: {
        primaryColor: '#A9061C'
      },
      modules: {
        onAfterInitHls: (hls) => {
          const playerInstant = this.fluidPlayer;
          hls.on('hlsManifestLoaded', (): void => {
            playerInstant.videoSources = hls.levels.map((source, index) => {
              return {
                title: `${source.height}p`,
                url: index,
                isHD: source.height >= 720 ? true : false,
              };
            });
            playerInstant.videoSources.reverse();

            const sourceChangeButton = video.parentElement.querySelector(
              `#video_fluid_control_video_source`
            );
            sourceChangeButton.style.display = 'inline-block';

            let appendSourceChange = false;
            const sourceChangeList = this.renderer.createElement('div');
            sourceChangeList.id = 'video_fluid_control_video_source_list';
            sourceChangeList.classList.add('fluid_video_sources_list');
            sourceChangeList.style.display = 'none';

            let firstSource = true;
            playerInstant.videoSources.forEach((source) => {
              const sourceSelected =
                source.url === hls.firstLevel ? 'source_selected' : '';
              const hdElement = source.isHD
                ? '<sup style="color:#A9061C" class="fp_hd_source"></sup>'
                : '';
              firstSource = false;
              const sourceChangeDiv = this.renderer.createElement('div');
              sourceChangeDiv.id = 'source_video_' + source.title;
              sourceChangeDiv.classList.add('fluid_video_source_list_item');
              sourceChangeDiv.innerHTML =
                '<span class="source_button_icon ' +
                sourceSelected +
                '"></span>' +
                source.title +
                hdElement;

              sourceChangeDiv.addEventListener('click', (event): void => {
                event.stopPropagation();
                hls.loadLevel = source.url;
                hls.currentLevel = source.url;
                playerInstant.openCloseVideoSourceSwitch();
              });

              sourceChangeList.appendChild(sourceChangeDiv);
              appendSourceChange = true;

              if (appendSourceChange) {
                sourceChangeButton.appendChild(sourceChangeList);
                sourceChangeButton.addEventListener('click', () => {
                  playerInstant.openCloseVideoSourceSwitch();
                });
              } else {
                video.parentElement.querySelector(
                  '#video_fluid_control_video_source'
                ).style.display = 'none';
              }
            });
          });

          hls.on('hlsLevelSwitched', (): void => {
            video.parentElement
              .querySelector('.source_button_icon.source_selected')
              .classList.remove('source_selected');

            const currentLevelTitle = playerInstant.videoSources.filter(
              (source) => source.url === hls.currentLevel
            )[0].title;
           
            video.parentElement
              .querySelector(
                `#source_video_${currentLevelTitle} .source_button_icon`
              )
              .classList.add('source_selected');
          });
        },
      },
    });

    this.fluidPlayer.openCloseVideoSourceSwitch = (): void => {
      const list = video.parentElement.querySelector(
        '#video_fluid_control_video_source_list'
      );
      if (list) {
        if (list.style.display === 'none') {
          list.style.display = 'block';
        } else {
          list.style.display = 'none';
        }
      }
    };
  }

  toFullScreen() {
    let elem = this.videoElement.nativeElement as HTMLVideoElement;
    // var elem = document.getElementById("video");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

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
}
