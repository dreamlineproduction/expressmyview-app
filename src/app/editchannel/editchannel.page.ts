import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import {ServiceService} from '../service.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editchannel',
  templateUrl: './editchannel.page.html',
  styleUrls: ['./editchannel.page.scss'],
})
export class EditchannelPage implements OnInit {
  back:string='assets/icon/back.svg';
  logo_img:string='assets/icon/logo.svg';
  search:string='assets/icon/search.svg';
  logo:any;
  user_image:any = 'assets/icon/default_user.png';
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
  cid:any;
  channelDetails:any;
  loaded:boolean = false;
  constructor(private location: Location,  public navCtrl: NavController, private camera: Camera, private actionSheetController : ActionSheetController, private file: File, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController, private route: ActivatedRoute, private router: Router) {
    this.uid = localStorage.getItem("user_id");
    this.route.queryParams.subscribe((data) => {
      this.cid = data.id;
    });
  }

  ionViewDidEnter(){
    this.loaded = false;
    this.uid = localStorage.getItem("user_id");
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
    this.getChannelDetails();
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

  async getChannelDetails(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      'channel_id' : this.cid
    };

    this.server.channelDetails(params).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("datas", response[0]);
        this.channelDetails = response[0].channelDetails;
        this.name = this.channelDetails.name;
        this.description = this.channelDetails.description;
        this.youtube = this.channelDetails.youtube;
        this.facebook = this.channelDetails.facebook;
        this.tiktok = this.channelDetails.tiktok;
        this.twitter = this.channelDetails.twitter;
        this.instagram = this.channelDetails.instagram;
        this.pinterest = this.channelDetails.pinterest;
        this.linkedin = this.channelDetails.linkedin;
        this.logo = this.channelDetails.logoPath;
        this.banner = this.channelDetails.bannerPath;
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        loading.dismiss();
      }
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
      id : this.cid
    }
    console.log("data", param);
    if(this.name == undefined || this.name == "" || typeof this.name === undefined ){
      this.presentToast("Name is mandatory");
    }else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await loading.present();
  
      this.server.updateChannel(param).subscribe((response: any) => {
        console.log("response", response);
        if ( response.error == undefined) {
          this.presentToast("Channel Updated Successfully");
          const navData: NavigationExtras = {
            queryParams: {
              id: this.cid
            }
          }
          this.router.navigate(['tabs/channel'], navData);
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

  ngOnInit(){
    if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
    }else{
      this.user_image = localStorage.getItem("user_image");
    }
  }

  goBack() {
    const navData: NavigationExtras = {
      queryParams: {
        id: this.cid
      }
    }
    this.router.navigate(['tabs/channel'], navData);
  }
}
