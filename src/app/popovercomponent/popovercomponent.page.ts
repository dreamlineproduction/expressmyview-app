import { Component, OnInit, Input } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { NavController, AlertController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-popovercomponent',
  templateUrl: './popovercomponent.page.html',
  styleUrls: ['./popovercomponent.page.scss'],
})
export class PopovercomponentPage implements OnInit {
  @Input("popupkey1") popupkey1;
  @Input("popupkey2") popupkey2;
  @Input("channelid") channelid;
  constructor(private popover:PopoverController, public navCtrl: NavController, public  modalCtrl: ModalController, private route: ActivatedRoute, private router: Router, public alertController: AlertController, public toastController: ToastController, public loadingController: LoadingController, public server: ServiceService) { }

  ngOnInit() {
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

  editChannel(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id,
        cid: this.channelid
      }
    }
    this.router.navigate(['tabs/editchannel'], navData);
    this.DismissClick();
  }

  deleteChannel(id){
    this.confirmDeleteChannel(id);
    this.DismissClick();
  }

  async confirmDeleteChannel(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>You are about to delete this channel. This action is irreversible.</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'OK',
          handler: () => {
            this.deleteChannelConfirmed(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteChannelConfirmed(id){
    const param = {
      id : id
    }
  
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.server.deleteChannel(param).subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        this.presentToast("Channel deleted Successfully");
        this.navCtrl.navigateForward('tabs/mychannels');
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        loading.dismiss();
      }
    });
   
  }

  editPodcast(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id,
        cid: this.channelid
      }
    }
    this.router.navigate(['tabs/editpodcast'], navData);
    this.DismissClick();
  }

  deletePodcast(id){
    this.confirmDeletePodcast(id);
    this.DismissClick();
  }

  async confirmDeletePodcast(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>You are about to delete this podcast. This action is irreversible.</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'OK',
          handler: () => {
            this.deletePodcastConfirmed(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deletePodcastConfirmed(id){
    const param = {
      id : id
    }
  
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.server.deletePodcast(param).subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        this.presentToast("Podcast deleted Successfully");
        loading.dismiss();
      }else{
        this.presentToast(response.error);
        loading.dismiss();
      }
    });
   
  }

  async DismissClick() {
    await this.popover.dismiss();
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
