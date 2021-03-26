import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpBackend } from '@angular/common/http';
import { NavController} from '@ionic/angular';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { SearchPage } from '../app/search/search.page';
import { FilterPage } from '../app/filter/filter.page';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  options:any;
  
  url = "https://expressmyview.crtvecode.in/expressmyview-git/expressmyview/public/api/";
  // url = "https://expressmyview.crtvecode.in/public/api/";
  // url = "https://testmyserver.in/expressmyviewserver/api/";
  constructor(private http: HttpClient,private httpBackend: HttpBackend, public navCtrl: NavController, public modalController: ModalController) {
    this.http = new HttpClient(this.httpBackend);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.options = {
      headers: headers
    }
  }

  login(data){  
    return this.http.post(this.url+'login',data,this.options)
             .pipe(map(results => results));
  }

  register(data){  
    return this.http.post(this.url+'reg',data,this.options)
             .pipe(map(results => results));
  }

  checkIfLoggedIn(){
    let userid =  localStorage.getItem('user_id');
    let useremail =  localStorage.getItem('user_email');
    let username =  localStorage.getItem('username');
    if(userid == '' || username == '' || useremail == '' || typeof userid === undefined || typeof username === undefined || typeof useremail === undefined){
      this.navCtrl.navigateForward('login');
    }else{
      this.navCtrl.navigateForward('tabs');
    }
  }
  
  logout(){
    // localStorage.setItem('user_id', "");
    // localStorage.setItem('user_email', "");
    // localStorage.setItem('username', "");
    localStorage.clear();
    this.navCtrl.navigateForward('login');
  }

  uploadPodcast(data){  
    return this.http.post(this.url+'login',data,this.options)
             .pipe(map(results => results));
  }

  getChannel(data){  
    return this.http.post(this.url+'channelsByUid',data,this.options)
             .pipe(map(results => results));
  }
  
  getLanguage(data){  
    return this.http.post(this.url+'allLanguages',data,this.options)
             .pipe(map(results => results));
  }

  getUploadPodcastDetails(data){  
    return this.http.post(this.url+'getUploadPodcastDetails',data,this.options)
             .pipe(map(results => results));
  }

  getHomeDatas(data){  
    return this.http.post(this.url+'getHomeDatas',data,this.options)
             .pipe(map(results => results));
  }

  getAllVideoPodcasts(){  
    return this.http.get(this.url+'getAllVideoPodcasts')
             .pipe(map(results => results));
  }

  getMyAccountDatas(data){  
    return this.http.post(this.url+'getMyAccountDatas', data, this.options)
             .pipe(map(results => results));
  }

  getPodcastDetails(data){  
    return this.http.post(this.url+'getPodcastDetails', data, this.options)
             .pipe(map(results => results));
  }

  getMyChannels(data){  
    return this.http.post(this.url+'getMyChannels', data, this.options)
             .pipe(map(results => results));
  }

  channelDetails(data){  
    return this.http.post(this.url+'channelDetails', data, this.options)
             .pipe(map(results => results));
  }

  getuser(data){  
    return this.http.post(this.url+'getuser', data, this.options)
             .pipe(map(results => results));
  }

  updateAccountSettings(data){  
    return this.http.post(this.url+'updateAccountSettings', data, this.options)
             .pipe(map(results => results));
  }

  createChannel(data){  
    return this.http.post(this.url+'createChannel', data, this.options)
             .pipe(map(results => results));
  }
  
  changePassword(data){  
    return this.http.post(this.url+'changePassword', data, this.options)
             .pipe(map(results => results));
  }

  forgotPassword(data){  
    return this.http.post(this.url+'forgotpassword',data,this.options)
             .pipe(map(results => results));
  }

  verifyCode(data){  
    return this.http.post(this.url+'verifyotp',data,this.options)
             .pipe(map(results => results));
  }

  changepasswordafterverified(data){  
    return this.http.post(this.url+'changepasswordafterverified',data,this.options)
             .pipe(map(results => results));
  }

  likePodcast(data){
    return this.http.post(this.url+'likePodcast',data,this.options)
    .pipe(map(results => results));
  }

  subscribePodcast(data){
    return this.http.post(this.url+'subscribePodcast',data,this.options)
    .pipe(map(results => results));
  }

  relatedPodcasts(data){
    return this.http.post(this.url+'relatedPodcasts',data,this.options)
    .pipe(map(results => results));
  }

  updateChannel(data){
    return this.http.post(this.url+'updateChannel',data,this.options)
    .pipe(map(results => results));
  }

  deleteChannel(data){
    return this.http.post(this.url+'deleteChannel',data,this.options)
    .pipe(map(results => results));
  }

  deletePodcast(data){
    return this.http.post(this.url+'deletePodcast',data,this.options)
    .pipe(map(results => results));
  }

  updatePodcastDetails(data){
    return this.http.post(this.url+'updatePodcastDetails',data,this.options)
    .pipe(map(results => results));
  }

  getMySubscriptions(data){
    return this.http.post(this.url+'mySubscriptionsAPI',data,this.options)
    .pipe(map(results => results));
  }

  getAllChannels(data){
    return this.http.post(this.url+'getAllChannels',data,this.options)
    .pipe(map(results => results));
  }

  getLiveStreams(data){
    return this.http.post(this.url+'getLiveStreams',data,this.options)
    .pipe(map(results => results));
  }

  watchAPI(data){
    return this.http.post(this.url+'watchAPI',data,this.options)
    .pipe(map(results => results));
  }

  subscribeChannel(data){
    return this.http.post(this.url+'subscribeChannel',data,this.options)
    .pipe(map(results => results));
  }

  searchAPI(data, options){
    return this.http.post(this.url+'searchAPI',data, options)
    .pipe(map(results => results));
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async filterSearch() {
    const modal = await this.modalController.create({
      component: FilterPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
