import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { HttpClient,HttpHeaders, HttpBackend } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

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
  default_podcast:string='assets/icon/default_user.png';
  searchResults:any;
  nextPageURL:any;
  moreData:boolean = false;

  constructor(public modalController: ModalController, private httpBackend: HttpBackend, public server: ServiceService, public toastController: ToastController, private http: HttpClient,private router: Router)  {
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
        this.searchResults = response.queryResults.podcasts.data;
        this.nextPageURL = response.queryResults.podcasts.next_page_url;
        if(this.nextPageURL != null){
          this.moreData =  true;
        }
      }else{
        this.presentToast(response.error);
      }
    });
  }

  goToChannelDetails(id){
    this.modalController.dismiss()
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['tabs/channel'], navData);
  }

  goToPlay(id){
    this.modalController.dismiss()  
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['tabs/podcast'], navData);
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

  doInfinite(event:any){
    console.log("nextPage", this.nextPageURL);
    this.server.loadMorePost(this.nextPageURL+'&q='+this.searchKeys).subscribe((response: any) => {
      console.log("reponse more", response);
      response.queryResults.podcasts.data.forEach(element => {
        this.searchResults.push(element);
      });
      this.nextPageURL = response.queryResults.podcasts.next_page_url;
      event.target.complete()
      console.log("nextPagei", this.nextPageURL);
      if(this.nextPageURL == null){
        this.moreData = false;
      }
    });
  }
}
