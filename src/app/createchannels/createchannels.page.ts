import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-createchannels',
  templateUrl: './createchannels.page.html',
  styleUrls: ['./createchannels.page.scss'],
})
export class CreatechannelsPage implements OnInit {
  back:string='assets/icon/back.svg';
  logo_img:string='assets/icon/logo.svg';
  search:string='assets/icon/search.svg';
  user_image:any = 'assets/icon/default_user.png';
  logo:any;
  banner:any;
  name:any;
  description:any;
  facebook:any;
  twitter:any;
  youtube:any;
  instagram:any;
  pinterest:any;
  linkedin:any;
  tiktok:any;
  selectedImage:any;
  uid:any;
  constructor(private location: Location,  public navCtrl: NavController, private camera: Camera, private actionSheetController : ActionSheetController, private file: File, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController) { 
    this.uid = localStorage.getItem("user_id");
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
  }

  pickImage(sourceType, source){
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
       this.camera.getPicture(options).then((imageData) => {
         this.selectedImage = 'data:image/jpeg;base64,' + imageData;
         if(source == "logo"){
          this.logo = this.selectedImage;
         }else{
          this.banner = this.selectedImage;
         }
         
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
      // Handle error
      });
  }

  async selectImage(source){
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image Source",
      buttons: [{
        text: "Load from Library",
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY, source);
        }
      },{
        text: "Use Camera",
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA, source)
        }
      },{
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async save(data){
    const param = {
      name : this.name,
      banner : this.banner,
      logo : this.logo,
      description : this.description,
      facebook : this.facebook,
      twitter : this.twitter,
      youtube : this.youtube,
      pinterest: this.pinterest,
      instagram : this.instagram,
      linkedin: this.linkedin,
      tiktok : this.tiktok,
      id : this.uid
    }
    console.log("data", param);
    if(this.name == undefined || this.name == "" || typeof this.name === undefined ){
      this.presentToast("Name is mandatory");
    }else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await loading.present();
  
      this.server.createChannel(param).subscribe((response: any) => {
        console.log("response", response);
        if ( response.error == undefined) {
          this.presentToast("Channel Created Successfully");
          this.name = "";
          this.banner = "";
          this.logo = "";
          this.description = "";
          this.facebook = "";
          this.twitter = "";
          this.youtube = "";
          this.pinterest = "";
          this.instagram = "";
          this.linkedin = "";
          this.tiktok = "";
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

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
