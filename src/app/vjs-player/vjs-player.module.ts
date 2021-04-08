import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VjsPlayerComponent } from './vjs-player.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [VjsPlayerComponent],
  exports: [VjsPlayerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VjsPlayerModule { }
