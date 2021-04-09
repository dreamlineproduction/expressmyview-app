import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { NgxAgoraService  , Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import videojs from 'video.js';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.page.html',
  styleUrls: ['./livestream.page.scss'],
})
export class LivestreamPage{
  @ViewChild('video') video: ElementRef;
  @ViewChild('agora_local') agora_local: ElementRef;
  @ViewChild('remote_container') remote_container: ElementRef;
  @ViewChild('target', {static: true}) target: ElementRef;
  @ViewChild('htmlvideo') htmlVideo: ElementRef;

  options: {
    autoplay: boolean,
    controls: boolean,
    sources: {
        src: string,
        type: string,
    }[],
  };
  player: videojs.Player;
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
  lid:any;
  streamChannel:any;
  appID:any;
  stream_uid:any;
  loaded:boolean = false;
  podcastDetails = [];
  channelName:any;
  casts:any;
  tags:any;
  categories:any;
  isSubscribed:boolean;
  isLiked:boolean = false;
  disliked:boolean;
  uid:any;
  relatedPodcasts = [];
  newrelatedPodcasts = [];
  token:any;
  streamUid:any;
  isVideo:boolean = false;
  isSame:boolean = false;
  // player: videojs.Player;
  private client: AgoraClient;

  constructor(private location: Location,  public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private streamingMedia: StreamingMedia, private route: ActivatedRoute,private router: Router, private ngxAgoraService: NgxAgoraService) { 
    this.route.queryParams.subscribe((data) => {
      this.lid = data.lid;
    });
  
    this.uid = localStorage.getItem("user_id");
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
  }
  
  ionViewDidEnter(){
    this.watchAPI();
    this.client = this.ngxAgoraService.createClient({ mode: 'live', codec: 'vp8' });
    this.client.setClientRole("audience");
  }
  
  startCall() {
    console.log("appid", this.appID, "channel", this.streamChannel, "token", this.token, "userid", this.uid);
    // this.client.join(this.appID, this.streamChannel, this.token, null);
    // await this.client.join(this.appID, this.streamChannel, this.token, (uid) => {
    //   console.log("userid", uid);
    // });
    
    this.ngxAgoraService.client.join(this.token, this.streamChannel, this.uid, (uid) => {
      console.log("userid :",uid);
    }, (err) => {
      console.log(err);
    });

    this.ngxAgoraService.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      console.log("stream", stream);
      this.ngxAgoraService.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.ngxAgoraService.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      // this.video.nativeElement.srcObject = stream;
      // this.player.src({ src : stream , type : "appliction/webrtc"});
      // this.player.videoTracks().addTrack(stream);
      // this.htmlVideo.nativeElement.srcObject = stream;
      const id = stream.getId().toString();
      this.addVideoStream(id);
      stream.play(id);
    });

    // this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
    //   const stream = evt.stream as Stream;
    //   if (stream) {
    //     stream.stop();
    //     this.remoteCalls = [];
    //     console.log(`Remote stream is removed ${stream.getId()}`);
    //   }
    // });

    // this.client.on(ClientEvent.PeerLeave, evt => {
    //   const stream = evt.stream as Stream;
    //   if (stream) {
    //     stream.stop();
    //     this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
    //     console.log(`${evt.uid} left from this channel`);
    //   }
    // });
    
  }

  addVideoStream(elementId){
    let remoteContainer = this.remote_container;
    // Creates a new div for every stream
    let streamDiv = document.createElement("div");
    // Assigns the elementId to the div.
    streamDiv.id = elementId;
    // Takes care of the lateral inversion
    streamDiv.style.transform = "rotateY(180deg)";

    // streamDiv.style.height = "200px";
    // Adds the div to the container.
    remoteContainer.nativeElement.appendChild(streamDiv);

    // let options: StreamingVideoOptions = {
    //   successCallback: () => { console.log('Video played') },
    //   errorCallback: (e) => { console.log('Error streaming') },
    //   orientation: 'landscape',
    //   shouldAutoClose: true,
    //   controls: false
    // };
    
    // this.streamingMedia.playVideo('https://path/to/video/stream', options);
    // console.log("stream media");
    // console.log(stream);
    // remoteContainer.nativeElement.srcObject = stream;
  };

  public videoJsConfigObj = {
    preload: "metadata",
    controls: true,
    autoplay: true,
    overrideNative: true,
    techOrder: ["html5", "flash"],
    html5: {
        nativeVideoTracks: false,
        nativeAudioTracks: false,
        nativeTextTracks: false,
        hls: {
            withCredentials: false,
            overrideNative: true,
            debug: true
        }
    }
  };

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    
  }

  ngAfterViewChecked(){
    // this.options = { autoplay: true, controls: true, sources: [{ src: '', type: "appliction/webrtc" }]};
    // const options = { "width":"100%" };
    // this.player = videojs(this.video.nativeElement);
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  toFullScreen() {
    let elem = this.video.nativeElement as HTMLVideoElement;
    // var elem = document.getElementById("video");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  goBack() {
    this.location.back();
  }

  async watchAPI() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      id : this.uid,
      lid : this.lid
    };

    this.server.watchAPI(params).subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        // this.relatedPodcasts = response[0].relatedPodcasts;
        this.podcastDetails = response.livestreams;
        this.channelName = response.livestreams.channelName;
        this.casts = response.livestreams.casts;
        console.log("casts", this.casts);
        this.tags = response.livestreams.tags;
        this.categories = response.livestreams.categories;
        this.isVideo = true;
        this.appID = response.livestreams.appID;
        this.token = response.livestreams.token;
        this.streamChannel = response.livestreams.stream_channel;
        this.streamUid = response.livestreams.userrtm;
        this.startCall();
        this.isSubscribed = response.livestreams.isSubscribed;
        this.isLiked = response.livestreams.stream.isLiked;
        if(response.livestreams.user_id == this.uid){
          this.isSame = true
        }
        this.loaded = true;
        loading.dismiss();
      }
      else{
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
      pid : this.lid,
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
      pid : this.lid,
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
    this.lid = id;
    // this.getPodcastDetails();
  }
}

