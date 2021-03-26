import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController} from '@ionic/angular';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  back:string='assets/icon/back.svg';
  logo:string='assets/icon/logo.svg';
  search:string='assets/icon/search.svg';
  user_image:any = 'assets/icon/default_user.png';
  currentPassword:any;
  newPassword:any;
  confirmPassword:any;
  uid:any;

  constructor(private location: Location,  public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController) { 
    this.uid = localStorage.getItem("user_id");
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
  }

  ngOnInit() {

  }

  async changePassword() {
    console.log("this password", this.currentPassword);
    if(this.newPassword == "" || this.currentPassword == "" || this.confirmPassword == "" || typeof this.newPassword === undefined || typeof this.confirmPassword === undefined || typeof this.currentPassword === undefined || this.newPassword == undefined || this.currentPassword == undefined || this.confirmPassword == undefined){
      this.presentToast("All field are mandatory");
    }else if(this.newPassword != this.confirmPassword){
      this.presentToast("Password confirmation did not match");
    }
    else if(this.newPassword.length < 8){
      this.presentToast("Password length should be minimum 8 characters");
    }else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
  
      await loading.present();
  
      const params = {
        'id' : this.uid,
        'currentPassword' : this.currentPassword,
        'newPassword' : this.newPassword
      };
  
      this.server.changePassword(params).subscribe((response: any) => {
        if ( response.error == undefined) {
          this.presentToast("Password updated successfully");
          this.navCtrl.navigateForward('tabs/accountsettings');
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

  goBack() {
    this.location.back();
  }

}
