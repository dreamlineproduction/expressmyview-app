import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { NavController, ToastController, LoadingController} from '@ionic/angular';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  email:any;
  logo:string='assets/icon/logo.svg';
  verifycode:boolean = false;
  otpverified:boolean = false;
  verificationcode:any;
  id:any
  password:any;
  confirmpassword:any;
  constructor(public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController) { 
    this.id = localStorage.getItem('user_id');
  }

  ngOnInit() {
  }

  login(){
    this.navCtrl.navigateForward('login');
  }

  async onSubmitClick(data) {
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.email)) {
      this.presentToast("Please enter valid email");
      return false;
    }
    if(this.email == undefined || this.email == ""){
      this.presentToast("Please enter all details");
    }else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
  
      await loading.present();
  
      this.server.forgotPassword(data).subscribe((response: any) => {
        console.log("response", response);
        if ( response.error == undefined) {
          this.verifycode = true;
          loading.dismiss();
        }else{
          this.presentToast(response.error);
          loading.dismiss();
        }
      });
    }
  }

  async onVerify(data) {
    if(this.verificationcode == undefined || this.verificationcode == ""){
      this.presentToast("Please enter verification code");
    }else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
  
      await loading.present();
  
      const param = {
        otp: data,
        email: this.email
      }
      this.server.verifyCode(param).subscribe((response: any) => {
        console.log("response", response);
        if ( response.error == undefined) {
          this.otpverified = true;
          this.verifycode  = false;
          loading.dismiss();
        }else{
          this.presentToast(response.error);
          loading.dismiss();
        }
      });
    }
  }

  async changePasswordAfterVerified(data){
    if(this.confirmpassword == undefined || this.password == undefined || this.password == '' ||  this.confirmpassword == ''){
      this.presentToast("Enter both fields");
    }else if(this.password != this.confirmpassword){
      this.presentToast("Password and confirmed password didn't match");
    }else if(this.password.length < 6 ||  this.confirmpassword.length < 6){
      this.presentToast("Password length should be minimum 6 characters");
    }else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
  
      await loading.present();
  
      const param = {
        password: data,
        email: this.email
      }
      this.server.changepasswordafterverified(param).subscribe((response: any) => {
        console.log("response", response);
        if ( response.error == undefined) {
          this.otpverified = false;
          this.verifycode  = false;
          this.navCtrl.navigateForward('login');
          loading.dismiss();
        }else{
          this.presentToast(response.error);
          loading.dismiss();
        }
      });
    }
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
