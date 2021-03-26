import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController} from '@ionic/angular';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logo:string='assets/icon/logo.svg';
  rememberme:any;
  loaded:boolean = false;
  constructor(
    public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController) {
      this.checkIfLoggedIn();
    }

  ngOnInit() {
  }
  async doLogin(data) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    this.server.login(data).subscribe((response: any) => {
      console.log("response login", response);
      if ( response.error == undefined) {
        // if(this.rememberme){
        //   localStorage.setItem('rememberme', "true");
        //   localStorage.setItem('user_email', response[0][0].email);
        //   localStorage.setItem('username', response[0][0].name);
        //   localStorage.setItem('user_phone', response[1][0].phone);
        //   localStorage.setItem('user_address', response[1][0].address);
        // }
        const createdVariable = 'id';
        localStorage.setItem('user_id', response[0][0].id);
        localStorage.setItem('rememberme', "true");
        localStorage.setItem('user_email', response[0][0].email);
        localStorage.setItem('username', response[0][0].name);
        localStorage.setItem('user_phone', response[1][0].phone);
        localStorage.setItem('user_address', response[1][0].address);
        localStorage.setItem('user_image', response[1][0].imagePath);
        this.navCtrl.navigateForward('tabs');
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        loading.dismiss();
      }
    });
    // this.navCtrl.navigateForward('tabs');
  }

  changeRemember(event){
    this.rememberme = event;
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

  register(){
    this.navCtrl.navigateForward('register')
  }

  forgot(){
    this.navCtrl.navigateForward('forgot')
  }

  async checkIfLoggedIn(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    let userid =  localStorage.getItem('user_id');
    console.log("userid", userid)
    if(userid == '' || typeof userid === undefined || userid == null || userid == 'null'){
      this.loaded = true;
      loading.dismiss();
    }else{
      this.navCtrl.navigateForward('tabs');
      loading.dismiss();
    }
  }
}
