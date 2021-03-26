import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController} from '@ionic/angular';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  logo:string='assets/icon/logo.svg';

  constructor(public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController) { }

  ngOnInit() {
  }
  
  async doRegister(data){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();
    console.log("data",data);
    this.server.register(data).subscribe((response: any) => {
      loading.dismiss();
      if ( response.error == undefined) {
        console.log("response", response);
        localStorage.setItem('user_id', response["user"][0].id);
        localStorage.setItem('user_email', response["user"][0].email);
        localStorage.setItem('username', response["user"][0].name);
        localStorage.setItem('user_phone', response["user_profile"][0].phone);
        this.navCtrl.navigateForward('tabs');
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

  login(){
    this.navCtrl.navigateForward('login')
  }

}
