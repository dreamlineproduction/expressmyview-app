import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  back:string='assets/icon/back.svg';
  logo:string='assets/icon/logo.svg';
  search:string='assets/icon/search.svg';
  checkmark:string='assets/icon/checkmark.svg';
  tiger:string='assets/icon/tiger.svg';
  allChannels:any;
  user_image:any = 'assets/icon/default_user.png';
  uid:any;
  loaded:boolean = false;
  constructor(private location: Location,  public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private router: Router) { 
    this.uid = localStorage.getItem("user_id");
    this.getAllChannels();
  }

  ngOnInit() {
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

  async getAllChannels(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      'uid' : this.uid
    };

    this.server.getAllChannels(params).subscribe((response: any) => {
      console.log("datas", response);
      if ( response.error == undefined) {
        this.allChannels = response.message;
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
