import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
// import { Media, MediaObject } from '@ionic-native/media';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Pipe, PipeTransform } from '@angular/core';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { NavController, ToastController, LoadingController, ActionSheetController} from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {ServiceService} from '../service.service';
@Component({
  selector: 'app-editpodcast',
  templateUrl: './editpodcast.page.html',
  styleUrls: ['./editpodcast.page.scss'],
})
@Pipe({ name: 'appFilter' })
export class EditpodcastPage {
  title = '';
  searchText = '';
  user_image:any;
  allLanguages = [ ]
  logo:string='assets/icon/logo.svg';
  menu:string='assets/icon/menu.svg';
  search:string='assets/icon/search.svg';
  back:string='assets/icon/back.svg';
  cloud:string='assets/icon/cloud.svg';
  cloudgray:string='assets/icon/cloudgray.svg';
  myPhoto:any;
  croppedImagePath = "";
  podcast = {};
  uploadText:any;
  downloadText:any;
  fileTransfer:FileTransferObject;
  languages = [];
  uploadProgress = 0;
  videoUpload = false;
  fileType = "";
  filesName = "";
  fileURI:any;
  fileExtension = "";
  duration:any;
  size:any;
  uid:any;
  casts:any = [];
  channels:any = [];
  channel:any;
  categories:any = [];
  tags:any = [];
  licenses:any = [];
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  allLanguagesIds = [];
  allCastsIds = [];
  allTagsIds = [];
  allLanguageInDetails = [];
  allTagsInDetails = [];
  allTags = [];
  allCastsInDetails = [];
  allCasts = [];
  searchTextCasts = "";
  searchTextTags = "";
  selectedCategories :any = [];
  selectedCategoriesCount = 0;
  isCheckboxDisabled:boolean=false;
  newSearch = "";
  pid:any;
  loaded:boolean = false;
  podcastDetails = [];
  channelName:any;
  isSubscribed:boolean;
  isLiked:boolean;
  disliked:boolean;
  relatedPodcasts = [];
  newrelatedPodcasts = [];
  description:any;
  privacy:any;
  license:any;
  privacy_settings:any;
  cid:any;
  constructor(
    private location: Location, 
    public navCtrl: NavController, 
    public server: ServiceService, 
    public toastController: ToastController, 
    public loadingController: LoadingController,
    private camera: Camera, 
    private actionSheetController : ActionSheetController, 
    private file: File, 
    private transfer: FileTransfer,
    private filepath: FilePath,
    private filechooser: FileChooser,
    private zone: NgZone,
    private videoEditor: VideoEditor,
    private route: ActivatedRoute,
    public router: Router
    ) {
      this.uploadText = "";
      this.downloadText = ""; 
      this.languages = [];
      this.route.queryParams.subscribe((data) => {
        this.pid = data.id;
        this.cid = data.cid
      });
      this.uid = localStorage.getItem('user_id');
      this.user_image = localStorage.getItem("user_image");
      this.getDatas();
      this.getPodcastDetails();
    }

  selectMember(event, checkbox : String){
    if ( event.target.checked ) {
      this.selectedCategories.push(checkbox);
      this.selectedCategoriesCount++;
      console.log("added", this.selectedCategories, this.selectedCategoriesCount);
    } else{
      let index = this.removeCheckedFromArray(checkbox);
      this.selectedCategories.splice(index,1);
      this.selectedCategoriesCount--;
      console.log("removed", this.selectedCategories, this.selectedCategoriesCount);
    }

    if(this.selectedCategoriesCount >=6){
      this.isCheckboxDisabled=true;
    }else{
      this.isCheckboxDisabled=false;
    }
  }

  removeCheckedFromArray(checkbox : String) {
    return this.selectedCategories.findIndex((category)=>{
      return category === checkbox;
    })
  }

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    const oldSearch = this.newSearch;
    this.newSearch = searchText;
    const index: number = items.indexOf(oldSearch);
    if (index !== -1) {
      items.splice(index, 1);
    }
    items.push(this.newSearch);
    return items.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }

  onSearchChange(event){
    console.log("event search", event);
  }

  addLanguage(e){
    console.log("event search", e.target.innerHTML);
    const addIndex: number = this.languages.indexOf(e.target.innerHTML);
    if (addIndex == -1) {
      this.languages.push(e.target.innerHTML);
    }
    console.log("added languages", this.languages);
    const index: number = this.allLanguages.indexOf(e.target.innerHTML);
    if (index !== -1) {
        this.allLanguages.splice(index, 1);
    }
    this.searchText = "";
  }

  removeLanguage(e){
    console.log("event close", e);
    const index: number = this.languages.indexOf(e);
    if (index !== -1) {
      this.languages.splice(index, 1);
    }
    console.log("removed languages", this.languages);
    this.allLanguages.push(e);
  }

  addCast(e){
    console.log("event search", e.target.innerHTML);
    const addIndex: number = this.casts.indexOf(e.target.innerHTML);
    if (addIndex == -1) {
      this.casts.push(e.target.innerHTML);
    }
    console.log("added casts", this.casts);
    const index: number = this.allCasts.indexOf(e.target.innerHTML);
    if (index !== -1) {
        this.allCasts.splice(index, 1);
    }
    this.searchTextCasts = "";
  }

  removeCast(e){
    console.log("event close", e);
    const index: number = this.casts.indexOf(e);
    if (index !== -1) {
      this.casts.splice(index, 1);
    }
    console.log("removed casts", this.casts);
    this.allCasts.push(e);
  }

  addTag(e){
    console.log("event search", e.target.innerHTML);
    const addIndex: number = this.tags.indexOf(e.target.innerHTML);
    if (addIndex == -1) {
      this.tags.push(e.target.innerHTML);
    }
    console.log("added tags", this.tags);
    const index: number = this.allTags.indexOf(e.target.innerHTML);
    if (index !== -1) {
        this.allTags.splice(index, 1);
    }
    this.searchTextTags = "";
  }

  removeTag(e){
    console.log("event close", e);
    const index: number = this.tags.indexOf(e);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
    this.allTags.push(e);
    console.log("removed tags", this.tags);
  }

  pickImage(sourceType){
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
        this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
        this.myPhoto = this.croppedImagePath;
    }, (err) => {
      this.presentToast(err);
    });
  }

  async selectImage(){
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image Source",
      buttons: [{
        text: "Load from Library",
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },{
        text: "Use Camera",
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA)
        }
      },{
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async save(data){
    if(this.privacy_settings == "private"){
      this.privacy = "0";
    }else{
      this.privacy = "1";
    }
    const param = {
      id : this.pid,
      channel : this.channel,
      title : this.title,
      privacy : this.privacy,
      description : this.description,
      languages : this.languages,
      categories : this.selectedCategories,
      thumbnail : this.myPhoto,
      license : this.license,
      tags : this.tags,
      casts : this.casts
    }
    console.log("data", param);
    if(this.title == undefined || this.title == "" || typeof this.title === undefined ){
      this.presentToast("Title is mandatory");
    }else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await loading.present();
  
      this.server.updatePodcastDetails(param).subscribe((response: any) => {
        console.log("response", response);
        if ( response.error == undefined) {
          this.presentToast("Podcast Updated Successfully");
  
          loading.dismiss();
        }else{
          this.presentToast(response.error);
          loading.dismiss();
        }
      });
    }
  }

  goBack() {
    const navData: NavigationExtras = {
      queryParams: {
        cid: this.cid
      }
    }
    this.router.navigate(['tabs/channel'], navData);
  }

  async getDatas() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      'userid' : this.uid
    };

    this.server.getUploadPodcastDetails(params).subscribe((response: any) => {
      console.log("channels", response);
      console.log("channels", response);
      if(response.channels.error){
        this.presentToast(response.channels.error);
        loading.dismiss();
      }else{
        this.allCastsInDetails = response.casts;
        response.casts.forEach(cast => {
          this.allCasts.push(cast.name);
        });

        this.channels = response.channels;
        this.categories = response.categories;
        
        this.allTagsInDetails = response.tags;
        response.tags.forEach(tag => {
          this.allTags.push(tag.name);
        });

        this.licenses = response.licenses;
        this.allLanguageInDetails = response.languages;
        response.languages.forEach(language => {
          this.allLanguages.push(language.name);
        });
        loading.dismiss(); 
      }
    });
    // this.navCtrl.navigateForward('tabs');
  }

  async getPodcastDetails() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      id : this.pid,
      uid : this.uid
    };

    this.server.getPodcastDetails(params).subscribe((response: any) => {
      console.log("response1", response[0]);
      if ( response.error == undefined) {
        this.relatedPodcasts = response[0].relatedPodcasts;
        this.podcastDetails = response[0].podcast;
        this.channelName = response[0].channelName;
        this.casts = response[0].casts;
        this.tags = response[0].tags;
        this.languages =  response[0].languages;
        this.categories.forEach(element => {
          response[0].categories.forEach(responseElement => {
            if(element.name == responseElement){
              element.checked = true;
              this.selectedCategories.push(element.name);
              this.selectedCategoriesCount++;
            }

            if(this.selectedCategoriesCount >=6){
              this.isCheckboxDisabled=true;
            }else{
              this.isCheckboxDisabled=false;
            }
          });
        });
        this.isSubscribed = response[0].isSubscribed;
        this.isLiked = response[0].isLiked;
        this.description = response[0].podcast.description;
        this.title = response[0].podcast.title;
        this.license = response[0].podcast.license_id;
        this.channel = response[0].podcast.channel_id;
        this.myPhoto = response[0].podcast.thumbnail;
        // this.title = response[0].podcast.description;
        if(response[0].podcast.privacy == "0"){
          this.privacy_settings = "private";
        }else{
          this.privacy_settings = "public";
        }
        // for(let i = 0; i < this.relatedPodcasts.length; i++){
        //   console.log(this.newrelatedPodcasts[i], "podcast");
        //   this.relatedPodcasts.push(this.newrelatedPodcasts[i]);
        // }
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

}
