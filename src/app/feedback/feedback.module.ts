import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';

import { FeedbackPage } from './feedback.page';
import { AttachmentsComponentModule } from '../attachments/attachments.module';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackPageRoutingModule,
    AttachmentsComponentModule,
    IonicModule, ReactiveFormsModule
  ],
  providers: [Camera],
  declarations: [FeedbackPage]
})
export class FeedbackPageModule {}
