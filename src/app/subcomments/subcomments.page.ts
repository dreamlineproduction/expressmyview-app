import { Component, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-subcomments',
  templateUrl: './subcomments.page.html',
  styleUrls: ['./subcomments.page.scss'],
})
export class SubcommentsPage implements OnInit {
  @Input("cid") cid;
  @Input("uid") uid;
  @Input("pid") pid;
  loaded:boolean = false;
  user_image:any = 'assets/icon/default_user.png';
  close:string='assets/icon/close.png';
  back:string='assets/icon/back.svg';
  comment:any;
  allReplies = [];
  commentBox:any;

  constructor(public modalController: ModalController, 
    public navCtrl: NavController, 
    public server: ServiceService, 
    public toastController: ToastController, 
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllComments();
  }

  closeModel(){
    for(var i=0; i< this.server.modalInst.length; i++)
    {
      this.server.modalInst[i].dismiss();
    }
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
      cid : this.cid,
      uid : this.uid
    };

    this.server.getAllReplyByCommentId(params).subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        this.comment = response.comment;
        this.allReplies = response.replies.data;
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        this.loaded = true;
        loading.dismiss();
      }
    });
  }

  async uploadComment() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      pid : this.pid,
      comment: this.commentBox,
      uid : this.uid,
      cid : this.cid
    };

    this.server.uploadReply(params).subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        const data = {
            "id": response.message.id,
            "podcast_id": this.pid,
            "user_id": this.uid,
            "parent_id": this.cid,
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
        this.allReplies.unshift(data);
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

  goBack(){
    this.modalController.dismiss()
  }
}
