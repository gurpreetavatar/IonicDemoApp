import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentsComponent } from './attachments.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AttachmentsComponent],
  exports: [AttachmentsComponent]
})
export class AttachmentsComponentModule {}
