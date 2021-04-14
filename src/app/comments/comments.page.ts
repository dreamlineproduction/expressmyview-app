import { Component, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import {ServiceService} from '../service.service';
import { AlertController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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
  back:string='assets/icon/back.svg';
  allComments = [];
  commentBox:any;
  count:any;
  likes:any;
  subComment:boolean = false;
  comment:any;
  allReplies = [];
  cid:any;
  nextPageURL:any;
  nextReplyPageURL:any;
  moreData:boolean = false;
  moreReply:boolean = false;
  constructor(
    public modalController: ModalController, 
    public navCtrl: NavController, 
    public server: ServiceService, 
    public toastController: ToastController, 
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
      
  }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.getAllComments();
  }
  
  closeModel(){
    this.modalController.dismiss()
  }

  subComments(cid){
    this.server.subComments(this.uid, cid, this.pid);
    this.modalController.dismiss()
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

    this.server.uploadComment(params).subscribe((response: any) => {
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
            "user_image": response.message.user_image,
            "isSame": true
        }
        
        console.log("this comments", this.allComments);
        // if(this.allComments){
        //   this.allComments.unshift(data);
        // }else{
        //   this.allComments = data;
        // }
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

  async likeComment(comment) {
    if(comment.isSame){
      this.presentToast("You can't like your own comment");
    }else{
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
  
      await loading.present();
  
      const params = {
        cid : comment.id,
        uid : this.uid
      };
  
      this.server.likeComment(params).subscribe((response: any) => {
        console.log("response", response);
        if ( response.error == undefined) {
          this.presentToast(response.message);
          this.likes = response.likes;
          if(comment.isLiked == true){
            comment.likes--;
            comment.isLiked = false;
          }else{
            comment.likes++;
            comment.isLiked = true;
          }
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

 
  async delete(cid, myIndex, type) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'You are going to delete this comment, the process cannot be reverted back, please confirm to proceed.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.deleteComment(cid, myIndex, type);
          }
        }
      ]
    });

    await alert.present();
  }
  

  async deleteComment(cid, index, type) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      cid : cid,
      uid : this.uid
    };

    this.server.deleteComment(params).subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        this.presentToast(response.message);
        if(type == 'subComment'){
          console.log("inside subComment");
          if(index != "main"){
            this.allReplies.splice(index, 1);
          }else{
            this.allReplies = [];
            this.getAllComments();
            this.commentBox = [];
            this.cid = "";
            this.subComment = false;
          }
        }else{
          this.allComments.splice(index, 1);
        }
        this.loaded = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        this.loaded = true;
        loading.dismiss();
      }
    });
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
        // this.allComments = null;
        this.allComments = response.message.data;
        this.count = response.count;
        this.likes = response.message.data.likes;
        this.nextPageURL = response.message.next_page_url;
        if(this.nextPageURL != null){
          this.moreData =  true;
        }
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

  async getAllSubComments(cid) {
    this.cid = cid;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    const params = {
      cid : cid,
      uid : this.uid
    };

    this.server.getAllReplyByCommentId(params).subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        this.comment = response.comment;
        this.allReplies = response.replies.data;
        this.nextReplyPageURL = response.replies.next_page_url;
        if(this.nextReplyPageURL != null){
          this.moreReply =  true;
        }
        this.loaded = true;
        this.commentBox = [];
        this.subComment = true;
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        this.loaded = true;
        loading.dismiss();
      }
    });
  }

  async uploadReply() {
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
            "user_image": response.message.user_image,
            "isSame": true
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

  goBack(){
    this.getAllComments();
    this.commentBox = [];
    this.cid = "";
    this.subComment = false;
  }

  doInfinite(event:any){
    console.log("nextPage", this.nextPageURL);
    this.server.loadMorePost(this.nextPageURL+"&uid="+this.uid+"&pid="+this.pid).subscribe((response: any) => {
      console.log("reponse more", response);
      response.message.data.forEach(element => {
        this.allComments.push(element);
      });
      this.nextPageURL = response.message.next_page_url;
      event.target.complete()
      console.log("nextPagei", this.nextPageURL);
      if(this.nextPageURL == null){
        this.moreData = false;
      }
    });
  }

  loadMoreReply(event:any){
    console.log("nextPage", this.nextReplyPageURL);
    this.server.loadMorePost(this.nextReplyPageURL+"&uid="+this.uid+"&cid="+this.cid).subscribe((response: any) => {
      console.log("reponse more", response);
      response.replies.data.forEach(element => {
        this.allReplies.push(element);
      });
      this.nextReplyPageURL = response.replies.next_page_url;
      event.target.complete()
      console.log("nextPagei", this.nextReplyPageURL);
      if(this.nextReplyPageURL == null){
        this.moreReply = false;
      }
    });
  }
}
