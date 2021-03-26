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
import {ServiceService} from '../service.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
@Pipe({ name: 'appFilter' })
export class Tab3Page {
  title = 'angular-text-search-highlight';
  searchText = '';
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
  user_image:any = 'assets/icon/default_user.png';
  fileType = "";
  filesName = "";
  fileURI:any;
  fileExtension = "";
  duration:any;
  size:any;
  uid:any;
  casts:any = [];
  channels:any = [];
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
  loaded:boolean = false;
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
    // private media: Media
    ) {
      this.uploadText = "";
      this.downloadText = ""; 
      this.languages = [];
      this.uid = localStorage.getItem('user_id');
      this.getDatas();
    }

    ngOnInit(){
      if(typeof localStorage.getItem("user_image") === undefined || localStorage.getItem("user_image") == "undefined" || localStorage.getItem("user_image") == ""){
      
      }else{
        this.user_image = localStorage.getItem("user_image");
      }
    }
    async uploadFile(){
      const userid = localStorage.getItem('user_id');
      console.log("userid", userid);
      this.filechooser.open().then((uri)=>{
        this.fileURI = uri;
        this.filepath.resolveNativePath(uri).then(nativepath =>{
          this.filesName  = nativepath.substring(nativepath.lastIndexOf('/')+1);
          this.fileExtension = this.filesName.substring(this.filesName.lastIndexOf(".") + 1);
          if(this.fileExtension == "mp4"){
            this.fileType = "video";
            this.getvideoinfo(uri);
          }else if(this.fileExtension == "mp3"){
            this.fileType = "audio";
            // let duration = this.fileURI.getDuration();
            // console.log(duration);
            // this.getaudioinfo(uri);
            this.duration = 0;
          }
          if(this.fileExtension == "mp4" || this.fileExtension == "mp3"){
            console.log("file extension", this.fileExtension);
            console.log("filename", this.filesName);
            this.fileTransfer = this.transfer.create();
            let options: FileUploadOptions={
              fileKey: 'mediafile',
              fileName: this.filesName,
              chunkedMode:false,
              headers:{},
              mimeType:'video/mp4',
            }
            var params = {
              'userid' : userid,
              'filetype' : this.fileType,
              "runtime": this.duration,
              "fileName": "this.filesName",
              "size": this.size
            };

            options.params = params;
            var ft = new FileTransfer();
            var progressValue = 0;
            this.fileTransfer.onProgress((progressEvent) => {
              this.videoUpload = true;
              console.log(progressEvent);
              console.log("lenght progress", progressEvent.lengthComputable);
              if (progressEvent.lengthComputable ) {
                this.zone.run(() => {
                  var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                  this.uploadText = perc + "% loaded...";
                  this.uploadProgress = perc;
                });
              } else {
                if (this.uploadText == "") {
                  this.uploadText = "Loading";
                } else {
                  this.uploadText += ".";
                }
              }
            });
            console.log("data", this.duration, this.size);
            this.fileTransfer.upload(nativepath, 'https://testmyserver.in/expressmyviewserver/api/uploadMedia', options ).then((data)=>{
              console.log("transfer done =" + JSON.stringify(data));
              console.log("transfer done 1 =" + data);
              this.uploadProgress = 100;
            },(err)=>{
              this.uploadText = "";
              console.log(JSON.stringify(err));
            })
          }else{
            alert("Unsupported Format, Supported Audio format is mp3 and supported video format is mp4");
          }
          
        },(err)=>{
          console.log(JSON.stringify(err));
        })
      },(err)=>{
        console.log(JSON.stringify(err));
      })
    }

  async getvideoinfo(fileUri) {
    await this.videoEditor.getVideoInfo({ fileUri: fileUri }).then((videoInfo) => {
        this.size = videoInfo.size;
        this.duration =  videoInfo.duration;
        console.log("data1", this.duration, this.size);
      // this.mediaduration = videoInfo.duration;
    }).catch((error) => {
      alert(error);
    });
  }

  getaudioinfo(fileUri) {
    let audioFileDuration = fileUri.getDuration();
    alert(audioFileDuration);
  }

  abortUpload(){
    this.fileTransfer.abort();
    console.log("upload Cancel");
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
    // this.allLanguageInDetails.forEach(allLanguage => {
    //   if(allLanguage.name == e.target.innerHTML){
    //     this.allLanguagesIds.push(allLanguage.id);
    //     console.log("selected languages", this.allLanguagesIds);
    //   }
    // });
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
    // this.allLanguageInDetails.forEach(allLanguage => {
    //   if(allLanguage.name == e){
    //     const ids: number = this.allLanguagesIds.indexOf(allLanguage.id);
    //     if (ids !== -1) {
    //       this.allLanguagesIds.splice(ids, 1);
    //       console.log("removed languages", this.allLanguagesIds);
    //     }
    //   }
    // });
  }

  addCast(e){
    console.log("event search", e.target.innerHTML);
    const addIndex: number = this.casts.indexOf(e.target.innerHTML);
    if (addIndex == -1) {
      this.casts.push(e.target.innerHTML);
    }
    // this.allCastsInDetails.forEach(allCast => {
    //   if(allCast.name == e.target.innerHTML){
    //     this.allCastsIds.push(allCast.id);
    //     console.log("selected languages", this.allCastsIds);
    //   }
    // });
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
    // this.allCastsInDetails.forEach(allCast => {
    //   if(allCast.name == e){
    //     const ids: number = this.allCastsIds.indexOf(allCast.id);
    //     if (ids !== -1) {
    //       this.allCastsIds.splice(ids, 1);
    //       console.log("removed languages", this.allCastsIds);
    //     }
    //   }
    // });
  }

  addTag(e){
    console.log("event search", e.target.innerHTML);
    const addIndex: number = this.tags.indexOf(e.target.innerHTML);
    if (addIndex == -1) {
      this.tags.push(e.target.innerHTML);
    }
    console.log("added tags", this.tags);
    // this.allCastsInDetails.forEach(allCast => {
    //   if(allCast.name == e.target.innerHTML){
    //     this.allCastsIds.push(allCast.id);
    //     console.log("selected languages", this.allCastsIds);
    //   }
    // });
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
    // this.allCastsInDetails.forEach(allCast => {
    //   if(allCast.name == e){
    //     const ids: number = this.allCastsIds.indexOf(allCast.id);
    //     if (ids !== -1) {
    //       this.allCastsIds.splice(ids, 1);
    //       console.log("removed languages", this.allCastsIds);
    //     }
    //   }
    // });
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
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
      // Handle error
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

  save(){
    console.log("saved data", this.podcast);
  }

  uploadVideo(){
    
  }

  goBack() {
    this.location.back();
  }

  public items = [
    {display: 'Pizza', value: 1},
    {display: 'Pasta', value: 2},
    {display: 'Parmesan', value: 3},
  ];

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
      console.log("channels", response.channels);
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
        this.loaded = true;
        loading.dismiss(); 
      }
    });
    // this.navCtrl.navigateForward('tabs');
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
