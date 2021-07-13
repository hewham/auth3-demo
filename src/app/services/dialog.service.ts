import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  
  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ){ }

  async toast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top'
    });
    toast.present();
  }

  async alert(message, header = "") {
    let alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    })
    await alert.present();
  }

  async error(message, header = "Oops!") {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [{
        text: 'Got It',
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    await alert.present();
  }

  async prompt(message = "Are you sure?", noButtonText = 'No', yesButtonText = 'Confirm', header = '') {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header,
        message,
        buttons: [
          {
            text: noButtonText, handler: () => {
              resolve(false)
            }
          },
          {
          text: yesButtonText,
            handler: () => {
              resolve(true)
            }
          }
        ]
      });
      await alert.present(); 
    })
  }

  async inputPrompt(message = "Please enter", noButtonText = 'No', yesButtonText = 'Confirm', header = '', inputPlaceholder = '') {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header,
        message,
        inputs: [
          {
            name: 'input',
            placeholder: inputPlaceholder,
          }
        ],
        buttons: [
          {
            text: noButtonText, handler: () => {
              resolve(false)
            }
          },
          {
          text: yesButtonText,
            handler: (data) => {
              if(!data.input) {
                resolve(true);
              } else {
                resolve(data.input)
              }
            }
          }
        ]
      });
      await alert.present(); 
    })
  }

}