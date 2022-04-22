import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { apiConstants } from 'src/app/providers/api-constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from '../providers/alert.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  locations: any;
  feedbackForm: FormGroup;
  feedbackAttachmentOne: '';
  feedbackAttachmentTwo: '';
  feedbackAttachmentThree: '';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    private alertService: AlertService, public loadingController: LoadingController) {
    this.feedbackForm = this.formBuilder.group({
      feedbackType: [''],
      location: [''],
      notes: ['']
    });
  }

  ngOnInit() {
    this.getLocations();
  }
  getLocations() {
    this.apiService.get(apiConstants.getLocations).subscribe((locations) => {
      this.locations = locations.aaData;
      console.log(this.locations);
    });
  }

  attachmentOne(imageData) {
    this.feedbackAttachmentOne = imageData.imageBase64;
  }
  attachmentTwo(imageData) {
    this.feedbackAttachmentTwo = imageData.imageBase64;
  }
  attachmentThree(imageData) {
    this.feedbackAttachmentThree = imageData.imageBase64;
  }
  submitFeedback() {
    const loader = this.loadingController.create({
      spinner: 'crescent',
      backdropDismiss: false
    });
    loader.then(loaderData => loaderData.present());
    const fedbackParams = {
      feedback_info_related_to: this.feedbackForm.controls.feedbackType.value,
      master_location_uuid: this.feedbackForm.controls.location.value.master_location_uuid,
      user_information_uuid: 'eb413762a5f85881c63cd196f4c5569b',
      master_restaurant_uuid: this.feedbackForm.controls.location.value.master_restaurant_uuid,
      order_info_uuid: null,
      feedback_info_suggestion: this.feedbackForm.controls.notes.value,
      feedback_info_attachment_1: this.feedbackAttachmentOne,
      feedback_info_attachment_2: this.feedbackAttachmentTwo,
      feedback_info_attachment_3: this.feedbackAttachmentThree,
    };
    this.apiService.post(apiConstants.postFeedback, fedbackParams).subscribe((feedbackSubmitted) => {
      loader.then(loaderData => loaderData.dismiss());
      if (feedbackSubmitted.statusCode === 200) {
        this.feedbackForm.controls.feedbackType.setValue('');
        this.feedbackForm.controls.location.setValue('');
        this.feedbackForm.controls.notes.setValue('');
        this.alertService.presentToast('Feedback successfully submitted.');
      } else {
        this.alertService.presentToast('Some error occured while submiting feedback.');
      }
    });
  }

}
