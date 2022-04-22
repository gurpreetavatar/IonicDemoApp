import { Injectable } from '@angular/core';
import { ActionSheetController, ToastController} from '@ionic/angular';


export interface ActionSheetOptions {
  header?: string;
  cssClass?: string;
  buttons: ActionSheetButtonOptions[];
  cancelButtonText?: string;
  cancelHandler?: () => void;
}
export interface ActionSheetButtonOptions {
  text?: string;
  icon?: 'cancel' | 'destructive' | 'selected' | string;
  role?: string;
  cssClass?: 'ion-text-danger';
  handler?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private actionSheetController: ActionSheetController, public toastController: ToastController) { }

  async presentActionSheet(config: ActionSheetOptions) {
    const actionSheet = await this.actionSheetController.create({
      header: config.header,
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        ...config.buttons,
        {
          text: config.cancelButtonText || 'Cancel',
          role: 'destructive',
          handler: config.cancelHandler
        }]
    });
    await actionSheet.present();
  }
  async presentToast(toastMsg) {
    const toast = await this.toastController.create({
      message: toastMsg,
      duration: 2000
    });
    toast.present();
  }



}
