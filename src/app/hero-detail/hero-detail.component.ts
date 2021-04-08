import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'
import 'videojs-landscape-fullscreen'
import '@silvermine/videojs-quality-selector';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-hero-detail',
  template: `
    <video #target class="video-js vjs-big-play-centered" controls muted playsinline preload="none"></video>
  `,
  styleUrls: ['./hero-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class HeroDetailComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/maintutorial-options.html
  @Input() options: {
      fluid: boolean,
      aspectRatio: string,
      autoplay: boolean,
      height: string|number,
      width: string|number,
      sources: {
          src: string,
          type: string,
      }[],
  };
  player: videojs.Player;
  isFullScreen:boolean = false;
  constructor(
    private elementRef: ElementRef,
    private screenOrientation: ScreenOrientation
  ) { }

  initVideo( stream : any ){      
    this.player.src({ src : stream , type : "appliction/webrtc"});
  }

  ngOnInit() {
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    var screenOrientation = this.screenOrientation;
    this.player.on('fullscreenchange', function() {
      console.log("screen change");
     
      if(this.isFullScreen){
        this.isFullScreen = false;
        screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
      }else{
        this.isFullScreen = true;
        screenOrientation.lock(screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
    });
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
