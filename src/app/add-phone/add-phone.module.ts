import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPhonePageRoutingModule } from './add-phone-routing.module';

import { AddPhonePage } from './add-phone.page';
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPhonePageRoutingModule,
    ImageCropperModule,
    ReactiveFormsModule
  ],
  declarations: [AddPhonePage]
})
export class AddPhonePageModule {}
