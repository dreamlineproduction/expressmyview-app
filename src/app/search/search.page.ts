import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { HttpClient,HttpHeaders, HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  options:any;
  searchKeys:any;
  back:string='assets/icon/back.svg';
  filter:string='assets/icon/filter.png';
  constructor(public modalController: ModalController, private httpBackend: HttpBackend, public server: ServiceService, public toastController: ToastController, private http: HttpClient)  {
    this.http = new HttpClient(this.httpBackend);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    this.options = {
      headers: headers
    }
   }

  ngOnInit() {
  }

  goBack(){
    this.modalController.dismiss()
  }

  filterSearch(){
    this.server.filterSearch();
  }

  searchKey(ev){
    this.searchKeys = ev.target.value;
    const params = {
      q : this.searchKeys,
    };

    this.server.searchAPI(params, this.options).subscribe((response: any) => {
      if ( response.error == undefined) {
        console.log("response", response);
      }else{
        this.presentToast(response.error);
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
