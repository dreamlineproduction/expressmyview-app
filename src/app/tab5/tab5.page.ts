import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController} from '@ionic/angular';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page{
  logo:string='assets/icon/logo.svg';
  default_podcast:string='assets/icon/default_podcast.jpeg';
  menu:string='assets/icon/menu.svg';
  search:string='assets/icon/search.svg';
  tiger:string='assets/icon/tiger.svg';
  checkmark:string='assets/icon/checkmark.svg';
  eye:string='assets/icon/eye.svg';
  user_image:any = 'assets/icon/default_user.png';
  uid:any;
  calendar:string='assets/icon/calendar.svg';
  title:string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
  allVideoPodcasts:any;
  loaded:boolean = false;
  nextPageURL:any;
  moreData:boolean = false;
  constructor(public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private router: Router) {
    this.title = this.truncateChar(this.title);
    this.uid = localStorage.getItem("user_id");
  }

  ionViewDidEnter(){
    this.loaded = false;
    this.uid = localStorage.getItem("user_id");
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
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

    this.server.getLiveStreams("").subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("datas", response.streams);
        this.allVideoPodcasts = response.streams.data;
        this.nextPageURL = response.streams.next_page_url;
        if(this.nextPageURL != null){
          this.moreData =  true;
        }
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        this.loaded = true;
        loading.dismiss();
      }
    });
  }

  doInfinite(event:any){
    console.log("nextPage", this.nextPageURL);
    this.server.loadMorePost(this.nextPageURL).subscribe((response: any) => {
      console.log("reponse more", response);
      response.streams.data.forEach(element => {
        this.allVideoPodcasts.push(element);
      });
      this.nextPageURL = response.streams.next_page_url;
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

  goToChannelDetails(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['tabs/channel'], navData);
  }
  ngOnInit(){
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
  }

  goToPlay(lid){
    const navData: NavigationExtras = {
      queryParams: {
        id: this.uid,
        lid: lid
      }
    }
    this.router.navigate(['tabs/livestream'], navData);
  }
}
