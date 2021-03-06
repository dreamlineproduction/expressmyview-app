import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-mysubscriptions',
  templateUrl: './mysubscriptions.page.html',
  styleUrls: ['./mysubscriptions.page.scss'],
})
export class MysubscriptionsPage implements OnInit {
  back:string='assets/icon/back.svg';
  logo:string='assets/icon/logo.svg';
  search:string='assets/icon/search.svg';
  checkmark:string='assets/icon/checkmark.svg';
  tiger:string='assets/icon/tiger.svg';
  mySubscriptions:any;
  user_image:any = 'assets/icon/default_user.png';
  default_channel:any = 'assets/icon/default_user.png';
  uid:any;
  nextPageURL:any;
  moreData:boolean = false;
  loaded:boolean = false;

  constructor(private location: Location,  public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private router: Router) { 
    this.uid = localStorage.getItem("user_id");
  }

  ionViewDidEnter(){
    this.loaded = false;
    this.uid = localStorage.getItem("user_id");
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
    this.getMySubscriptions();
  }

  ngOnInit(){
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
  }

  channel(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['tabs/tabs'], navData);
  }

  async getMySubscriptions(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      'uid' : this.uid
    };

    this.server.getMySubscriptions(params).subscribe((response: any) => {
      // console.log("datas", response.message);
      if ( response.error == undefined) {
        this.mySubscriptions = response.message.data;
        this.nextPageURL = response.message.next_page_url;
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
    this.server.loadMorePost(this.nextPageURL+"&uid="+this.uid).subscribe((response: any) => {
      console.log("reponse more", response);
      response.message.data.forEach(element => {
        this.mySubscriptions.push(element);
      });
      this.nextPageURL = response.message.next_page_url;
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

  goBack() {
    this.location.back();
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
