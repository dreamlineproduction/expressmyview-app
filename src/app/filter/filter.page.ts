import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  close:string='assets/icon/close.png';
  allCategories = [];

  constructor(public modalController: ModalController, public navCtrl: NavController, public server: ServiceService, public toastController: ToastController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllCategories();
  }

  closeFilter(){
    this.modalController.dismiss()
  }

  async getAllCategories() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    await loading.present();

    this.server.getAllCategories().subscribe((response: any) => {
      console.log("response", response);
      if ( response.error == undefined) {
        this.allCategories = response.allCategories;
        console.log("allCategories", this.allCategories);
        loading.dismiss();
      }
      else{
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
