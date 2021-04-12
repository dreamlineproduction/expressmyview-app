import { Component, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @Input("pid") pid;
  @Input("uid") uid;
  loaded:boolean = false;
  user_image:any = 'assets/icon/default_user.png';
  close:string='assets/icon/close.png';
  allComments = [];
  commentBox:any;
  count:any;
  likes:any;

  constructor(public modalController: ModalController, public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController) {
      
  }

  ngOnInit() {
    this.getAllComments();
  }

  ionViewDidEnter(){
    
  }
  
  closeModel(){
    this.modalController.dismiss()
  }

  subComments(cid){
    this.server.subComments(this.uid, cid, this.pid);
  }

  async uploadComment() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      pid : this.pid,
      comment: this.commentBox,
      uid : this.uid
    };

    this.server.likeComment(params).subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        const data = {
            "id": response.message.id,
            "podcast_id": this.pid,
            "user_id": this.uid,
            "parent_id": 0,
            "message": this.commentBox,
            "likes": 0,
            "status": 1,
            "created_at": response.message.created_at,
            "updated_at": response.message.updated_at,
            "replyCount": 0,
            "date": response.message.date,
            "username": response.message.username,
            "user_image": response.message.user_image
        }
        this.allComments.unshift(data);
        this.count++;
        this.commentBox = "";
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        this.loaded = true;
        loading.dismiss();
      }
    });
  }

  async likeComment(cid, isSame) {
    if(isSame){
      this.presentToast("You can't like your own comment");
    }else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
  
      await loading.present();
  
      const params = {
        cid : cid,
        uid : this.uid
      };
  
      this.server.likeComment(params).subscribe((response: any) => {
        console.log("response", response);
        if ( response.error == undefined) {
          this.presentToast(response.message);
          this.likes = response.likes;
          this.loaded = true;
          loading.dismiss();
        }else{
          this.presentToast(response.error);
          this.loaded = true;
          loading.dismiss();
        }
      });
    }
  }


  async getAllComments() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      pid : this.pid,
      uid : this.uid
    };

    this.server.getAllCommentsByPodcastId(params).subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        this.allComments = response.message.data;
        this.count = response.count;
        this.likes = response.message.data.likes;
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        this.loaded = true;
        loading.dismiss();
      }
    });
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position: 'bottom',
      mode: 'ios',
      color: 'dark'
    });
    toast.present();
  }

}
