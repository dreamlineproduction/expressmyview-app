import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-mychannels',
  templateUrl: './mychannels.page.html',
  styleUrls: ['./mychannels.page.scss'],
})
export class MychannelsPage implements OnInit {
  back:string='assets/icon/back.svg';
  logo:string='assets/icon/logo.svg';
  search:string='assets/icon/search.svg';
  checkmark:string='assets/icon/checkmark.svg';
  tiger:string='assets/icon/tiger.svg';
  myChannels:any;
  user_image:any;
  uid:any;

  constructor(private location: Location,  public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private router: Router) { 
    this.uid = localStorage.getItem("user_id");
    this.user_image = localStorage.getItem("user_image");
    this.getMyChannels();
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  channel(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id,
        myChannel: "myChannel"
      }
    }
    this.router.navigate(['tabs/channel'], navData);
  }

  async getMyChannels(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      'userid' : this.uid
    };

    this.server.getMyChannels(params).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("datas", response[0]);
        this.myChannels = response[0].myChannels;
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
}
