import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AlertService } from '../providers/alert.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  @Output() valueUpdate = new EventEmitter();
  isImageCaptured = false;
  capturedImage: string;
  constructor(private camera: Camera, private alertService: AlertService, private platform: Platform) { }

  ngOnInit() { }

  removeAttachment() {
    this.capturedImage = '';
    this.isImageCaptured = false;
    this.valueUpdate.emit({ imageBase64: this.capturedImage });
  }
  chooseMode() {
    console.log('mode');
    this.alertService.presentActionSheet({
      header: 'Choose mode',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: ' Take photo',
          handler: () => {
            this.captureImage(false);
          }
        },
        {
          text: ' Choose photo from Gallery',
          handler: () => {
            this.captureImage(true);
          }
        },
      ]
    });
  }

  captureImage(useAlbum: boolean) {
    this.platform.ready().then(() => {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        ...useAlbum ? { sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM } : {}
      };
      this.camera.getPicture(options).then((imageData) => {
        this.isImageCaptured = true;
        this.capturedImage = 'data:image/jpeg;base64,' + imageData;
        this.valueUpdate.emit({ imageBase64: this.capturedImage });
      }, (error) => {
        this.alertService.presentToast('Error while adding iamge.');
      });
    });
  }


}
