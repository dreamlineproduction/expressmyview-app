import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  close:string='assets/icon/close.png';
  constructor(public modalController: ModalController, public server: ServiceService) { }

  ngOnInit() {
  }

  closeFilter(){
    this.modalController.dismiss()
  }
}
